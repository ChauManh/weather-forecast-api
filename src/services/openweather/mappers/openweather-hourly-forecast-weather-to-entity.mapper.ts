import { HourlyForecast } from 'src/weather/hourly-forecast.entity';
import { OpenWeatherHourlyForecastItem } from '../interfaces/hourly-forecast-weather.interface';

export function mapToHourlyForecastEntity(
  item: OpenWeatherHourlyForecastItem,
  city_id: number
): HourlyForecast {
  const hf = new HourlyForecast();

  hf.city_id = city_id;
  hf.weather_condition_id = item.weather[0].id;

  hf.hf_timestamp = item.dt;
  hf.icon = item.weather[0]?.icon ?? '';

  hf.temperature = item.main.temp ?? 0;
  hf.feels_like = item.main.feels_like ?? 0;
  hf.pressure = item.main.pressure ?? 0;
  hf.humidity = item.main.humidity ?? 0;
  hf.clouds = item.clouds.all ?? 0;

  hf.uv = 0; // Nếu cần, có thể lấy từ OneCall API
  hf.visibility = item.visibility ?? 0;
  hf.wind_speed = item.wind.speed ?? 0;
  hf.pop = item.pop;
  hf.aqi = 0; // Nếu cần, lấy từ air_pollution API

  return hf;
}
