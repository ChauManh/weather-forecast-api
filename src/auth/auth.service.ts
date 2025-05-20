import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/utils/hash.util';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(username: string, password: string) {
    console.log(username, password);
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new UnauthorizedException('Invalid username');
    }
    const match = await comparePassword(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid password');
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
