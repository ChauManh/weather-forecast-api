import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthRequest } from 'src/auth/interfaces/auth-request.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const result = await this.userService.createUser(dto);
    return ApiResponse.success(result, 'Create new account successfully');
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserById(@Req() req: AuthRequest) {
    const userId = req.user.sub;
    const result = await this.userService.getUserById(userId);
    return ApiResponse.success(result, 'Get User Profile successfully');
  }
}
