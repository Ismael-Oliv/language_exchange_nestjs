import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserRepository } from '../repository/user.repository';
import { SigInData } from '../types';

@Injectable()
export class SigInSevice {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(data: SigInData): Promise<any> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new BadRequestException('Email/password is incorrect');
    }

    const isMatch = await compare(data.password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Email/password is incorrect');
    }

    const token = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        subject: user.id,
      },
    );

    return {
      user,
      token,
    };
  }
}
