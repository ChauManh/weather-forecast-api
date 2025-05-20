import { CurrentWeather } from '../current-weather.entity';
import { CurrentWeatherResponse } from '../dto/current-weather.response';

export function mapToCurrentWeatherResponse(
  entity: CurrentWeather
): CurrentWeatherResponse {
  return {
    cityName: entity.city.city_name,
    temperature: entity.temperature,
    feels_like: entity.feels_like,
    pressure: entity.pressure,
    humidity: entity.humidity,
    clouds: entity.clouds,
    visibility: entity.visibility,
    wind_speed: entity.wind_speed,
    uv: entity.uv,
    aqi: entity.aqi,
    icon: entity.icon,
    weather_description: entity.weatherCondition.weather_description,
    cur_timestamp: entity.cur_timestamp,
  };
}
