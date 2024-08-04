import { FactoryProvider, Module, ModuleMetadata } from '@nestjs/common';
import { ConnectionConfig, Pool } from 'pg';

export const IOPostgresKey = 'IOPostgres';

type RedisModuleOptions = {
  connectionOptions: ConnectionConfig;
  onClientReady?: (client: Pool) => void;
};

type RedisAsyncModuleOption = {
  useFactory: (
    ...args: any[]
  ) => Promise<RedisModuleOptions> | RedisModuleOptions;
} & Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider, 'inject'>;

@Module({})
export class PostgresModule {
  static async registerAsync({
    imports,
    useFactory,
    inject,
  }: RedisAsyncModuleOption) {
    const databaseProvider = {
      provide: IOPostgresKey,
      useFactory: async (...args) => {
        const { connectionOptions, onClientReady } = await useFactory(...args);
        const client = new Pool(connectionOptions);
        onClientReady(client);

        return client;
      },
      inject,
    };

    return {
      module: PostgresModule,
      imports,
      providers: [databaseProvider],
      exports: [databaseProvider],
    };
  }
}
