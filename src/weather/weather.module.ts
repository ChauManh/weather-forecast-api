import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentWeather } from './current-weather.entity';
import { HourlyForecast } from './hourly-forecast.entity';
import { ServicesModule } from 'src/services/services.module';
import { CityModule } from 'src/city/city.module';
import { City } from 'src/city/city.entity';
import { DailyForecast } from './daily-forecast.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CurrentWeather,
      HourlyForecast,
      City,
      DailyForecast,
    ]),
    ServicesModule,
    CityModule,
  ],
  providers: [WeatherService],
  controllers: [WeatherController],
})
export class WeatherModule {}
