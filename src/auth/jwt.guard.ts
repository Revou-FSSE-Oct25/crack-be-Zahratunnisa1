// src/auth/jwt.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest() as any;
    const authHeader = request.headers['authorization'];
    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];
    try {
      const payload = this.jwtService.verify(token, { secret: 'SECRET_KEY' });
      request.user = { id: payload.sub, email: payload.email }; // important
      return true;
    } catch (err) {
      return false;
    }
  }
}
