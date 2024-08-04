import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { SocketWithAuth } from 'src/config/type';
import { RedisService } from 'src/database/redis/redis.service';
import { CheckUserByIdsService } from 'src/User/services/check-by-ids.service';
import { ChatService } from 'src/Chat/services/chat.service';
import { CheckUserByIdService } from 'src/User/services/check-by-id.service';

@WebSocketGateway({
  namespace: 'chat',
})
export class ChatGateWay
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(ChatGateWay.name);
  constructor(
    private readonly redisService: RedisService,
    private readonly checkUserService: CheckUserByIdsService,
    private readonly findUserByIdService: CheckUserByIdService,
    private readonly chatService: ChatService,
  ) {}

  @WebSocketServer() io: Namespace;

  afterInit() {
    this.logger.log(`Websocket Gateway initialized.`);
  }

  async handleConnection(client: SocketWithAuth) {
    const userId = client.user.id;
    const socketId = client.id;

    await client.join(userId);
    await this.redisService.add(userId, socketId);
    // const socketsId = await this.redisService.find();
    const users = await this.findUserByIdService.execute(userId);

    this.io.emit('online', { users });
  }

  async handleDisconnect(client: SocketWithAuth) {
    const userId = client.user.id;
    await this.redisService.remove(userId);

    const socketsId = await this.redisService.find();
    const users = await this.checkUserService.execute(socketsId);

    this.io.emit('online', { users });
  }

  @SubscribeMessage('send_message')
  async send_message(
    @MessageBody() data: any,
    @ConnectedSocket() socket: SocketWithAuth,
  ) {
    const { receiver_id, message } = data;
    const sender_id = socket.user.id;

    const createdMessage = await this.chatService.send({
      sender_id,
      receiver_id,
      message,
    });

    const socketId = await this.redisService.findById(data.receiver_id);

    if (socketId)
      this.io.to(receiver_id).emit('update', {
        message: createdMessage,
        notification: {
          userId: sender_id,
        },
      });

    this.io.to(sender_id).emit('update', {
      message: createdMessage,
      notification: {
        userId: sender_id,
      },
    });
  }
}
