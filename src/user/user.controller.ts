import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthRequest } from 'src/auth/interfaces/auth-request.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserFullnameDto } from './dto/update-user.dto';

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

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @Patch('avatar')
  async updateUserProfile(
    @Req() req: AuthRequest,
    @UploadedFile() fileAvatar: Express.Multer.File
  ) {
    const userId = req.user.sub;
    const result = await this.userService.updateUserAvatar(userId, fileAvatar);
    return ApiResponse.success(result, 'Update profile successfully');
  }

  @UseGuards(JwtAuthGuard)
  @Patch('fullname')
  async updateUserFullName(
    @Req() req: AuthRequest,
    @Body() dto: UpdateUserFullnameDto
  ) {
    const userId = req.user.sub;
    const result = await this.userService.updateUserFullname(
      userId,
      dto.fullname
    );
    return ApiResponse.success(result, 'Update profile successfully');
  }
}
