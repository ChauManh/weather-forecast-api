import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserAlertType } from './user-alert-type.entity';
import { UserAlert } from './user-alert.entity';
import { UserAlertHistory } from './user-alert-history.entity';
import { City } from 'src/city/city.entity';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserAlertType,
      UserAlert,
      UserAlertHistory,
      City,
    ]),
    ServicesModule,
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
