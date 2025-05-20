import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException } from '@nestjs/common';
import { hashPassword } from 'src/utils/hash.util';

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
}
