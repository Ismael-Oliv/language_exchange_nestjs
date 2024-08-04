import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { CreateUserService } from './services/create.service';
import { ListUsersService } from './services/list.service';
import { SigInSevice } from './services/sigin.service';

import { UserRepository } from './repository/user.repository';
import { postgresModuleConfig } from '../database/postgres/postgres.config';
import { jwtModuleConfig } from '../Jwt/jwt.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, postgresModuleConfig, jwtModuleConfig],
  controllers: [UserController],
  providers: [CreateUserService, ListUsersService, SigInSevice, UserRepository],
})
export class UserModule {}
