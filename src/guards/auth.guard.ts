import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('JWT token is missing');
    }

    const [, token] = authHeader.split(' ');

    try {
      const payload = this.jwtService.verify(token);
      request.user = {
        id: payload.sub,
      };

      return true;
    } catch (error) {
      throw new ForbiddenException('Invalid authorization token');
    }
  }
}
