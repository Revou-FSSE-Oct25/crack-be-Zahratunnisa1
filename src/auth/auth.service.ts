import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (!user) {
      throw new UnauthorizedException('Email atau password salah');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Email atau password salah');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(body: any) {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: body.email.trim().toLowerCase(),
        password: hashedPassword,
        role: 'BUYER',
      },
    });

    const payload = {   // ✅ INI YANG KURANG TADI
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}

