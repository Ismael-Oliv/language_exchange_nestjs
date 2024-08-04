import { INestApplicationContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { SocketWithAuth } from './config/type';

export class SocketIOAdpter extends IoAdapter {
  constructor(
    private app: INestApplicationContext,
    private configService: ConfigService,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const socketPort = this.configService.get('SOCKET_PORT');

    const cors = {
      origin: [
        `http://localhost:5173`,
        new RegExp(`/^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):${socketPort}$/`),
      ],
    };

    const optionsWithCors: ServerOptions = {
      ...options,
      cors,
    };

    const jwtService = this.app.get(JwtService);

    const server: Server = super.createIOServer(port, optionsWithCors);

    server.of('chat').use(authSocketMiddleWare(jwtService));

    return server;
  }
}

const authSocketMiddleWare =
  (jwtService: JwtService) => (socket: SocketWithAuth, next) => {
    const authHeader = socket.handshake.auth.authorization;

    const [, token] = authHeader.split(' ');
    try {
      const payload = jwtService.verify(token);

      socket.user = {
        id: payload.sub,
      };

      next();
    } catch (error) {
      console.log(error);
      next(new Error('FORBIDDEN'));
    }
  };
