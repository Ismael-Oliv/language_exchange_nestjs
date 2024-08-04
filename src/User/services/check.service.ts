import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class CheckUserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(): Promise<Array<any> | undefined> {
    const users = await this.userRepository.findByEmail('');

    return;
  }
}
