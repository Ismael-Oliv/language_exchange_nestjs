import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PostgresModule } from './postgres.module';

export const postgresModuleConfig = PostgresModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const logger = new Logger('PostgresModule');
    return {
      connectionOptions: {
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        database: configService.get('POSTGRES_DATABASE'),
        user: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
      },

      onClientReady: (client) => {
        logger.log('Postgres client ready');
        client.on('connect', () => {
          logger.log(`Connected to posgres database`);
        });
      },
    };
  },
  inject: [ConfigService],
});
