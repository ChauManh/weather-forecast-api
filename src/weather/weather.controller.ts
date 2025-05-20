import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('by-id')
  async getWeatherByCity(@Query('city_id') city_id: number) {
    const weather = await this.weatherService.getWeatherByCityId(city_id);
    return ApiResponse.success(weather, `Get current weather successfully`);
  }
}
