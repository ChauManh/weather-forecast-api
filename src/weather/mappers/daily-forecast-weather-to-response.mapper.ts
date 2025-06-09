import { DailyForecast } from '../daily-forecast.entity';
import { DailyForecastResponse } from '../dto/daily-forecast-weather.response';

export function mapToDailyForecastResponse(
  entity: DailyForecast
): DailyForecastResponse {
  return {
    df_date: entity.df_date,
    icon: entity.icon,
    temperature_max: entity.temperature_max,
    temperature_min: entity.temperature_min,
    temperature_morn: entity.temperature_morn,
    temperature_day: entity.temperature_day,
    temperature_eve: entity.temperature_eve,
    temperature_night: entity.temperature_night,
    feels_like_morn: entity.feels_like_morn,
    feels_like_day: entity.feels_like_day,
    feels_like_eve: entity.feels_like_eve,
    feels_like_night: entity.feels_like_night,
    pressure: entity.pressure,
    humidity: entity.humidity,
    wind_speed: entity.wind_speed,
    clouds: entity.clouds,
    uv: entity.uv,
    aqi: entity.aqi,
    pop: entity.pop,
    summary: entity.summary,
    weather_description: entity.weatherCondition.weather_description,
  };
}
