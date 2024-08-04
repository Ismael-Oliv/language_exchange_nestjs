import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../../guards/auth.guard';
import { SendMessageDto } from '../types';
import { RequestWithAuth } from '../../config/type';
import { ChatService } from '../services/chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('/send')
  async sendMessage(@Body() data: SendMessageDto) {
    const message = await this.chatService.send(data);

    return message;
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async listMessages(
    @Query('id') receiver_id: string,
    @Request() request: RequestWithAuth,
  ) {
    const userId = request.user.id;

    return await this.chatService.listChat(userId, receiver_id);
  }

  @Get('/appointments')
  async listAppointmens() {
    return await this.chatService.listAppointment();
  }
}
