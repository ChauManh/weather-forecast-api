import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm.config';
import { CityModule } from './city/city.module';
import { WeatherModule } from './weather/weather.module';
import { UserModule } from './user/user.module';
import { CountryModule } from './country/country.module';
import { WeatherConditionModule } from './weather-condition/weather-condition.module';
import { SeederModule } from './seeder/seeder.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Đảm bảo tất cả các module trong Nest có thể truy cập .env mà không cần require() lại.
      load: [configuration], // Tải cấu hình từ file configuration.ts
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => typeOrmConfig(configuration()),
    }),
    CityModule,
    CountryModule,
    WeatherModule,
    UserModule,
    WeatherConditionModule,
    SeederModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
