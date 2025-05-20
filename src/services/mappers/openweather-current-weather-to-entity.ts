import { CurrentWeather } from 'src/weather/current-weather.entity';
import { OpenWeatherCurrentResponse } from '../interfaces/current-weather.interface';

export function mapToCurrentWeatherEntity(
  data: OpenWeatherCurrentResponse,
  city_id: number
): CurrentWeather {
  const weather = new CurrentWeather();

  weather.city_id = city_id;
  weather.weather_condition_id = data.weather[0].id;

  weather.cur_timestamp = data.dt;
  weather.icon = data.weather[0].icon;
  weather.temperature = data.main.temp;
  weather.feels_like = data.main.feels_like;
  weather.pressure = data.main.pressure;
  weather.humidity = data.main.humidity;
  weather.clouds = data.clouds?.all || 0;
  weather.uv = 0; // gọi API /onecall nếu cần
  weather.visibility = data.visibility;
  weather.wind_speed = data.wind?.speed || 0;
  weather.aqi = 0; // gọi API /air_pollution nếu cần

  return weather;
}
