import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException } from '@nestjs/common';
import { hashPassword } from 'src/utils/hash.util';
import { UserProfileResponse } from './dto/user-profile.response';
import { City } from 'src/city/city.entity';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(City) private cityRepo: Repository<City>,
    private readonly cloudinaryService: CloudinaryService
  ) {}

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
    return UserProfileResponse.fromEntity(user);
  }

  async updateUserAvatar(
    userId: number,
    fileAvatar: Express.Multer.File
  ): Promise<UserProfileResponse | null> {
    const user = await this.userRepo.findOne({
      where: { userId },
    });
    if (!user) throw new BadRequestException('User not found');
    if (!fileAvatar) throw new BadRequestException('Missing file avatar');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const result = await this.cloudinaryService.uploadStream(fileAvatar.buffer);
    if (!result.secure_url)
      throw new BadRequestException('Error when upload avatar');
    user.avatar = result.secure_url;
    await this.userRepo.save(user);
    return UserProfileResponse.fromEntity(user);
  }

  async updateUserFullname(
    userId: number,
    fullname: string
  ): Promise<UserProfileResponse | null> {
    const user = await this.userRepo.findOne({
      where: { userId },
    });
    if (!user) throw new BadRequestException('User not found');
    user.fullname = fullname;
    await this.userRepo.save(user);
    return UserProfileResponse.fromEntity(user);
  }
}
