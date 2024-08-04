import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserService } from '../services/create.service';
import { SigInSevice } from '../services/sigin.service';
import { ListUsersService } from '../services/list.service';

import { CreateUserDTO, SigInDto } from '../types';

@Controller()
export class UserController {
  constructor(
    private readonly createUser: CreateUserService,
    private readonly sigInSevice: SigInSevice,
    private readonly listUsersService: ListUsersService,
  ) {}

  @Post('/signup')
  async signup(@Body() data: CreateUserDTO) {
    return await this.createUser.execute(data);
  }

  @Post('/signin')
  async sigin(@Body() data: SigInDto) {
    return await this.sigInSevice.execute(data);
  }

  @Get('/list')
  async listUsers() {
    return await this.listUsersService.execute();
  }
}
