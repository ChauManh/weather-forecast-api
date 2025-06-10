// src/mappers/openweather-history-weather-to-entity.mapper.ts
import { OpenWeatherHistoryItem } from '../interfaces/history-weather.interface';
import { HistoryWeather } from 'src/weather/history-weather.entity';

export function mapToHistoryWeatherEntity(
  item: OpenWeatherHistoryItem,
  cityId: number
): HistoryWeather {
  const main = item.main || {};
  const wind = item.wind || {};
  const clouds = item.clouds || {};

  const entity = new HistoryWeather();
  entity.icon = item.weather[0].icon;
  entity.city_id = cityId;
  entity.weather_condition_id = item.weather[0].id;
  entity.timestamp = item.dt;
  entity.temperature = main.temp;
  entity.temperature_min = main.temp_min;
  entity.temperature_max = main.temp_max;
  entity.pressure = main.pressure;
  entity.humidity = main.humidity;
  entity.wind_speed = wind.speed;
  entity.wind_deg = wind.deg;
  entity.clouds = clouds.all;

  return entity;
}
