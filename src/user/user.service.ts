import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException } from '@nestjs/common';
import { hashPassword } from 'src/utils/hash.util';
import { UserProfileResponse } from './dto/user-profile.response';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const existing = await this.userRepo.findOneBy({
      username: dto.username,
    });
    if (existing) {
      throw new BadRequestException('Username already exists');
    }
    const hashed = await hashPassword(dto.password);
    const user = this.userRepo.create({ ...dto, password: hashed });
    return this.userRepo.save(user);
  }

  async findOne(username: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { username } });
  }

  async getUserById(userId: number): Promise<UserProfileResponse | null> {
    const user = await this.userRepo.findOne({
      where: { userId },
      relations: ['currentCity'],
    });
    if (!user) throw new BadRequestException('User not found');
    return {
      userId: user.userId,
      userName: user.username,
      fullName: user.fullname || '',
      avatar: user.avatar || '',
      email: user.email,
      currentCity: user.currentCity?.city_name || '',
      language: user.nd_language,
      measurementType: user.measurement_type,
      timezone: `UTC${user.utc >= 0 ? '+' : ''}${user.utc ?? '00:00'}`,
    };
  }
}
