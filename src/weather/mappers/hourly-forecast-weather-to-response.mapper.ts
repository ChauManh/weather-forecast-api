import { HourlyForecast } from '../hourly-forecast.entity';
import { HourlyForecastResponse } from '../dto/hourly-forecast-weather.response';

export function mapToHourlyForecastWeatherResponse(
  entity: HourlyForecast
): HourlyForecastResponse {
  return {
    hf_timestamp: entity.hf_timestamp,
    icon: entity.icon,
    temperature: entity.temperature,
    feels_like: entity.feels_like,
    pressure: entity.pressure,
    humidity: entity.humidity,
    clouds: entity.clouds,
    visibility: entity.visibility,
    wind_speed: entity.wind_speed,
    uv: entity.uv,
    aqi: entity.aqi,
    pop: entity.pop,
    weather_description: entity.weatherCondition.weather_description,
  };
}
