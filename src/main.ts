import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SocketIOAdpter } from './socket-io-adpter';

async function bootstrap() {
  const logger = new Logger('Main (main.ts)');

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const clientPort = parseInt(configService.get('SOCKET_PORT'));
  const port = parseInt(configService.get('HTTP_PORT'));

  app.enableCors({
    origin: [
      `http://localhost:5173`,
      new RegExp(`/^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):${clientPort}$/`),
    ],
  });

  app.useWebSocketAdapter(new SocketIOAdpter(app, configService));

  await app.listen(port);

  logger.log(`Server running on port ${port}`);
}
bootstrap();
