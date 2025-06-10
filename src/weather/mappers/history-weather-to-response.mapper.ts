// src/mappers/history-weather-to-response.ts
import { HistoryWeather } from '../history-weather.entity';
import { HistoryWeatherResponse } from '../dto/history-weather.response';

export function mapToHistoryWeatherResponse(
  entity: HistoryWeather
): HistoryWeatherResponse {
  return {
    hw_timestamp: entity.timestamp,
    temperature: entity.temperature,
    temperature_min: entity.temperature_min,
    temperature_max: entity.temperature_max,
    pressure: entity.pressure,
    humidity: entity.humidity,
    wind_speed: entity.wind_speed,
    wind_deg: entity.wind_deg,
    clouds: entity.clouds,
    weather_description: entity.weatherCondition.weather_description,
    icon: entity.icon,
  };
}
