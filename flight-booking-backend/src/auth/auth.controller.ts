import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') 
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login') 
  login(@Body() body: any) {
    const user = { id: 1, email: body.email };
    return this.authService.login(user);
  }
}
