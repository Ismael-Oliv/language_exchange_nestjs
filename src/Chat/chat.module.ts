import { Module } from '@nestjs/common';

import { ChatService } from './services/chat.service';
import { ChatRepository } from './repository/chat.repository';

import { ChatController } from './controller/chat.controller';
import { ConfigModule } from '@nestjs/config';
import { postgresModuleConfig } from '../database/postgres/postgres.config';
import { jwtModuleConfig } from '../Jwt/jwt.module';
import { redisModuleConfig } from 'src/database/redis/redisModuleConfig';
import { ChatGateWay } from './gateway/chat.gateway';
import { CheckUserByIdsService } from '../User/services/check-by-ids.service';
import { CheckUserByIdService } from '../User/services/check-by-id.service';
import { UserRepository } from '../User/repository/user.repository';

@Module({
  imports: [
    ConfigModule,
    postgresModuleConfig,
    jwtModuleConfig,
    redisModuleConfig,
  ],
  controllers: [ChatController],
  providers: [
    ChatService,
    ChatRepository,
    ChatGateWay,
    UserRepository,
    CheckUserByIdsService,
    CheckUserByIdService,
  ],
})
export class ChatModule {}
