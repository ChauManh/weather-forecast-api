import { IsOptional, IsString, IsNumber, MinLength } from 'class-validator';

export class UpdateUserFullnameDto {
  @IsOptional()
  @IsString()
  fullname: string;
}

export class UpdateUserCurrentCityDto {
  @IsOptional()
  @IsNumber()
  current_city_fk: number;
}

export class UpdateUserPasswordDto {
  @IsString()
  @MinLength(6)
  password: string;
}
