import {
  Controller,
  Get,
  Request,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInputDto } from './dto/auth-input.dto';
import { AuthGuard } from './auth.guard';
import { AuthGoogleDto } from './dto/auth-google.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() login: AuthInputDto) {
    return this.authService.login(login);
  }

  @Post('googleAuth')
  async authGoogle(@Body() login: AuthGoogleDto) {
    return this.authService.authGoogle(login);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
