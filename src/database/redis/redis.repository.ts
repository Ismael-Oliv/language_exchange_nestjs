import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisRepository {
  constructor(
    @Inject('IORedis')
    private readonly redisClient: ReturnType<() => Redis>,
  ) {}

  async add(userId: string, socketId: string) {
    const key = `user:${userId}`;

    await this.redisClient.call(
      'JSON.SET',
      key,
      '.',
      JSON.stringify({ userId, socketId }),
    );
    return;
  }

  async remove(userId: string) {
    const key = `user:${userId}`;

    await this.redisClient.call('JSON.Del', key);
    return;
  }

  async findOneByid(userId: string) {
    const key = `user:${userId}`;

    return (await this.redisClient.call('JSON.GET', key, '.')) as string;
  }

  async find() {
    return (await this.redisClient.call(
      'SCAN',
      0,
      'MATCH',
      'user:*',
    )) as Array<string>;
  }
}
