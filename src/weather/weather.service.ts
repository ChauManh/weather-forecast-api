import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { CurrentWeather } from './current-weather.entity';
import { OpenWeatherService } from 'src/services/openweather.service';
import { CityService } from 'src/city/city.service';
import { CurrentWeatherResponse } from './dto/current-weather.response';
import { mapToCurrentWeatherResponse } from './mappers/current-weather-to-reponse.mapper';
import { mapToCurrentWeatherEntity } from 'src/services/mappers/openweather-current-weather-to-entity';
import { OpenWeatherCurrentResponse } from 'src/services/interfaces/current-weather.interface';
import { HourlyForecast } from './hourly-forecast.entity';
import { mapToHourlyForecastEntity } from 'src/services/mappers/openweather-hourly-forecast-weather-to-entity';
import { OpenWeatherHourlyForecastResponse } from 'src/services/interfaces/hourly-forecast-weather.interface';
import { mapToHourlyForecastWeatherResponse } from './mappers/hourly-forecast-weather-to-response.mapper';
import { HourlyForecastResponse } from './dto/hourly-forecast-weather.response';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(CurrentWeather)
    private currentWeatherRepo: Repository<CurrentWeather>,
    @InjectRepository(HourlyForecast)
    private hourlyForecastWeatherRepo: Repository<HourlyForecast>,
    private openWeatherService: OpenWeatherService,
    private cityService: CityService
  ) {}

  async getCurrentWeatherByCityId(
    city_id: number
  ): Promise<CurrentWeatherResponse> {
    // Lấy thông tin thành phố qua service
    const city = await this.cityService.getCityById(city_id);
    if (!city) {
      throw new NotFoundException(`City not found`);
    }

    const currentWeather = await this.currentWeatherRepo.findOne({
      where: { city: { city_id: city.city_id } },
      relations: ['city', 'weatherCondition'],
    });

    const nowUnix = Math.floor(Date.now() / 1000);
    const tenMinutes = 10 * 60;
    if (currentWeather && nowUnix - currentWeather.cur_timestamp < tenMinutes) {
      return mapToCurrentWeatherResponse(currentWeather);
    }

    console.log('Fetch new current weather by openWeather service');
    const { data }: { data: OpenWeatherCurrentResponse } =
      await this.openWeatherService.call('/weather', {
        lat: city.latitude,
        lon: city.longitude,
        units: 'metric',
      });
    const newCurrentWeather = mapToCurrentWeatherEntity(data, city.city_id);
    if (currentWeather) {
      console.log('Have current weather in DB, updating...');
      newCurrentWeather.current_weather_id = currentWeather.current_weather_id;
      await this.currentWeatherRepo.save(newCurrentWeather);
    } else {
      console.log('Don"t have current weather DB, creating...');
      await this.currentWeatherRepo.save(newCurrentWeather);
    }

    const fullWeather = await this.currentWeatherRepo.findOne({
      where: { city: { city_id: city.city_id } },
      relations: ['city', 'weatherCondition'],
    });
    if (!fullWeather) throw new Error('Error when fetch current weather');
    return mapToCurrentWeatherResponse(fullWeather);
  }

  async getHourlyForecastWeatherByCityId(
    city_id: number,
    page = 1,
    limit = 6
  ): Promise<{
    data: HourlyForecastResponse[];
    total: number;
    page: number;
    limit: number;
  }> {
    const city = await this.cityService.getCityById(city_id);
    if (!city) throw new NotFoundException('City not found');

    const now = Math.floor(Date.now() / 1000);

    // Lấy tất cả record tương lai (timestamp > now)
    let [rows, total] = await this.hourlyForecastWeatherRepo.findAndCount({
      where: {
        city: { city_id },
        hf_timestamp: MoreThan(now),
      },
      relations: ['weatherCondition'],
      order: { hf_timestamp: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Nếu chưa đủ page đầu (hoặc lần đầu), gọi API, upsert và query lại
    if (rows.length === 0) {
      const { data: api } =
        await this.openWeatherService.call<OpenWeatherHourlyForecastResponse>(
          '/forecast/hourly',
          { lat: city.latitude, lon: city.longitude, units: 'metric' }
        );

      const entities = api.list.map((item) =>
        mapToHourlyForecastEntity(item, city_id)
      );

      // Upsert: insert những timestamp mới, skip trùng (dựa vào unique constraint)
      await this.hourlyForecastWeatherRepo
        .createQueryBuilder()
        .insert()
        .values(entities)
        .orIgnore() // .orIgnore() sẽ skip duplicate
        .execute();

      // Query lại
      [rows, total] = await this.hourlyForecastWeatherRepo.findAndCount({
        where: {
          city: { city_id },
          hf_timestamp: MoreThan(now),
        },
        relations: ['weatherCondition'],
        order: { hf_timestamp: 'ASC' },
        skip: (page - 1) * limit,
        take: limit,
      });
    }

    return {
      data: rows.map(mapToHourlyForecastWeatherResponse),
      total,
      page,
      limit,
    };
  }
}
