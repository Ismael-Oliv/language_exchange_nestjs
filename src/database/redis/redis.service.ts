import { Injectable } from '@nestjs/common';
import { RedisRepository } from '../redis/redis.repository';

@Injectable()
export class RedisService {
  constructor(private readonly redisRepository: RedisRepository) {}

  async add(userId: string, socketId: string) {
    return await this.redisRepository.add(userId, socketId);
  }

  async remove(socketId: string) {
    return await this.redisRepository.remove(socketId);
  }

  async findById(socketId: string) {
    return await this.redisRepository.findOneByid(socketId);
  }

  async find() {
    const userskey = await this.redisRepository.find();
    const usersList = [];

    for (let i = 0; i < userskey[1].length; i++) {
      const key = userskey[1][i];
      const [_, userId] = key.split(':');
      usersList.push(userId);
    }
    return usersList;
  }
}
