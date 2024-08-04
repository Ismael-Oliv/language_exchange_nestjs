import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class CheckUserByIdsService {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(listIds: Array<{ id: string }>): Promise<any> {
    const users = await this.userRepository.findByIds(listIds);

    return users;
  }
}
