import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getCurrentWeatherByCityId(@Query('city_id') city_id: number) {
    const weather =
      await this.weatherService.getCurrentWeatherByCityId(city_id);
    return ApiResponse.success(weather, `Get current weather successfully`);
  }

  @Get('forecast/hourly')
  async getHourlyForecastWeatherByCityId(
    @Query('city_id') city_id: number,
    @Query('page') page = 1,
    @Query('limit') limit = 12
  ) {
    const hourlyForcastWeathers =
      await this.weatherService.getHourlyForecastWeatherByCityId(
        city_id,
        +page,
        +limit
      );
    return ApiResponse.success(
      hourlyForcastWeathers,
      `Get hourly forecast weather successfully`
    );
  }

  @Get('forecast/daily')
  async getDailyForecastWeatherByCityId(@Query('city_id') city_id: number) {
    const dailyForcastWeathers =
      await this.weatherService.getDailyForecastWeatherByCityId(city_id);
    return ApiResponse.success(
      dailyForcastWeathers,
      `Get hourly forecast weather successfully`
    );
  }

  @Get('history')
  async getHistoryWeatherByCityId(@Query('city_id') city_id: number) {
    const historyWeathers =
      await this.weatherService.getHistoryWeatherByCityId(city_id);
    return ApiResponse.success(
      historyWeathers,
      `Get history weather successfully`
    );
  }
}
