import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './Chat/chat.module';
import { UserModule } from './User/user.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, ChatModule],
  providers: [],
})
export class AppModule {}
