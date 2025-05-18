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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Đảm bảo tất cả các module trong Nest có thể truy cập .env mà không cần require() lại.
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    CityModule,
    CountryModule,
    WeatherModule,
    UserModule,
    WeatherConditionModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
