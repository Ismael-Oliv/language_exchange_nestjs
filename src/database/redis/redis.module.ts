import {
  DynamicModule,
  FactoryProvider,
  Module,
  ModuleMetadata,
} from '@nestjs/common';
import IORedis, { Redis, RedisOptions } from 'ioredis';
import { RedisService } from './redis.service';
import { RedisRepository } from './redis.repository';

export const IORediskey = 'IORedis';

type RedisModuleOptions = {
  connectionOptions: RedisOptions;
  onClientReady?: (client: Redis) => void;
};

type RedisAsyncModuleOption = {
  useFactory: (
    ...args: any[]
  ) => Promise<RedisModuleOptions> | RedisModuleOptions;
} & Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider, 'inject'>;

@Module({})
export class RedisModule {
  static async registerAsync({
    useFactory,
    imports,
    inject,
  }: RedisAsyncModuleOption): Promise<DynamicModule> {
    const redisProvider = {
      provide: IORediskey,
      useFactory: async (...args) => {
        const { connectionOptions, onClientReady } = await useFactory(...args);
        const client = await new IORedis(connectionOptions);
        onClientReady(client);

        return client;
      },
      inject,
    };

    return {
      module: RedisModule,
      imports,
      providers: [redisProvider, RedisService, RedisRepository],
      exports: [redisProvider, RedisService, RedisRepository],
    };
  }
}
