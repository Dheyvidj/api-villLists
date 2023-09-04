//auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput, LoginResponse, RefreshTokenInput } from './dto/login-dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('/api/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: LoginResponse })
  async login(@Body() body: LoginInput): Promise<LoginResponse> {
    return this.authService.login(body.email, body.password);
  }

  @Post('refresh')
  @ApiOkResponse({ type: LoginResponse })
  refreshToken(@Body() body: RefreshTokenInput): Promise<LoginResponse> {
    return this.authService.reautenticar(body);
  }
}
