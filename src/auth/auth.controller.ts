import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    console.log('LoginDto instance:', dto);
    console.log('username:', dto.username, '| password:', dto.password);
    const result = await this.authService.login(dto.username, dto.password);
    return ApiResponse.success(result, 'Login successfully!');
  }
}
