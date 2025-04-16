import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/shared/dto/login.dto';
import { LoginDto } from 'src/shared/dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const { username, password } = dto;
    return this.authService.register(username, password);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const { username, password } = dto;
    const user = await this.authService.validateUser(username, password);
    return this.authService.login(user);
  }
}
