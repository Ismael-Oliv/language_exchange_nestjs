import { Injectable, BadRequestException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { UserRepository } from '../repository/user.repository';
import { UserDatabaseFields, CreateUserDTO } from '../types';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(user: CreateUserDTO): Promise<UserDatabaseFields> {
    const registerUser = await this.userRepository.findByEmail(user.email);

    if (registerUser) {
      throw new BadRequestException('Email is already in use');
    }

    const hashPassoword = await hash(user.password, 10);

    await this.userRepository.create({
      email: user.email,
      name: user.name,
      password: hashPassoword,
    });

    const createdUser = await this.userRepository.findByEmail(user.email);

    return createdUser;
  }
}
