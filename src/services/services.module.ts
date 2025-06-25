import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OpenWeatherService } from './openweather/openweather.service';
import { CloudinaryProvider } from './cloudinary/cloudinary.provider';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Module({
  imports: [HttpModule],
  providers: [OpenWeatherService, CloudinaryProvider, CloudinaryService],
  exports: [OpenWeatherService, CloudinaryService],
})
export class ServicesModule {}
