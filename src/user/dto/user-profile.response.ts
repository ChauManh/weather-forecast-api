import { User } from '../user.entity';

export class UserProfileResponse {
  userId: number;
  fullName: string;
  userName: string;
  email: string;
  avatar: string;
  currentCity: string;
  language: string;
  measurementType: string;
  timezone: string;

  static fromEntity(user: User): UserProfileResponse {
    const dto = new UserProfileResponse();
    dto.userId = user.userId;
    dto.userName = user.username;
    dto.fullName = user.fullname || '';
    dto.email = user.email;
    dto.avatar = user.avatar || '';
    dto.currentCity = user.currentCity?.city_name || '';
    dto.language = user.nd_language;
    dto.measurementType = user.measurement_type;
    dto.timezone = `UTC${user.utc >= 0 ? '+' : ''}${user.utc ?? '00:00'}`;
    return dto;
  }
}
