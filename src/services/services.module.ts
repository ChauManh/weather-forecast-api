import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OpenWeatherService } from './openweather.service';

@Module({
  imports: [HttpModule],
  providers: [OpenWeatherService],
  exports: [OpenWeatherService],
})
export class ServicesModule {}
