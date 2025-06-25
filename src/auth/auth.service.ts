import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/utils/hash.util';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly config: ConfigService
  ) {}

  async login(username: string, password: string) {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new BadRequestException('Invalid username');
    }
    const match = await comparePassword(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid password');
    const payload = { sub: user.userId, username: user.username };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: this.config.get('jwt.secret'),
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.config.get('jwt.refresh_secret'),
    });
    return {
      access_token,
      refresh_token,
      user: {
        userId: user.userId,
        userName: user.username,
        fullName: user.fullname || '',
        email: user.email,
        avatar: user.avatar || '',
        currentCity: user.currentCity?.city_name || '',
        language: user.nd_language,
        measurementType: user.measurement_type,
        timezone: `UTC${user.utc >= 0 ? '+' : ''}${user.utc ?? '00:00'}`,
      },
    };
  }

  async me(username: string) {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new UnauthorizedException('Invalid username');
    }
    return {
      userName: user.username,
      avatar: user.avatar || '',
      currentCity: user.currentCity?.city_name || '',
    };
  }
}
