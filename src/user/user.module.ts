import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserAlertType } from './user-alert-type.entity';
import { UserAlert } from './user-alert.entity';
import { UserAlertHistory } from './user-alert-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserAlertType,
      UserAlert,
      UserAlertHistory,
    ]),
  ],
  exports: [TypeOrmModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
