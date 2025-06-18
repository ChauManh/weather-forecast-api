import { Body, Controller, Post, Res, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { AuthRequest } from './interfaces/auth-request.interface';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
    private jwtService: JwtService
  ) {}

  private get isProd(): boolean {
    return this.config.get<string>('nodeEnv') === 'production';
  }

  private setCookie(res: Response, name: string, value: string, minute = 60) {
    res.cookie(name, value, {
      httpOnly: true,
      sameSite: this.isProd ? 'none' : 'lax',
      secure: this.isProd,
      maxAge: minute * 60 * 1000,
    });
  }

  private setAuthCookies(
    res: Response,
    accessToken: string,
    refreshToken: string
  ) {
    this.setCookie(res, 'access_token', accessToken, 60);
    this.setCookie(res, 'refresh_token', refreshToken, 7 * 24 * 60); // 7 days
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { access_token, refresh_token, user } = await this.authService.login(
      dto.username,
      dto.password
    );
    this.setAuthCookies(res, access_token, refresh_token);
    return ApiResponse.success(user, 'Login successfully!');
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return ApiResponse.success(null, 'Logged out');
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  async refresh_token(
    @Req() req: AuthRequest,
    @Res({ passthrough: true }) res: Response
  ) {
    const payload = req.user;
    const accessToken = await this.jwtService.signAsync(payload);
    this.setCookie(res, 'access_token', accessToken, 60);
    return ApiResponse.success(null, 'Access token refreshed');
  }
}
