import { Injectable } from '@nestjs/common';
import { ChatRepository } from '../repository/chat.repository';

import { SendMessageData } from '../types';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  public async send(messageData: SendMessageData) {
    const message = await this.chatRepository.create(messageData);
    await this.chatRepository.save(message);

    return message;
  }

  public async listChat(sender_id: string, reciever_id: string) {
    const messages = await this.chatRepository.ListMessageFromChat(
      sender_id,
      reciever_id,
    );

    return messages;
  }

  public async listAppointment() {
    const appointments = await this.chatRepository.ListAppointment();

    return appointments;
  }
}
