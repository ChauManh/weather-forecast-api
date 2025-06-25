import { OpenWeatherDailyForecastItem } from '../interfaces/daily-forecast-weather.interface';
import { DailyForecast } from 'src/weather/daily-forecast.entity';

export function mapToDailyForecastEntity(
  item: OpenWeatherDailyForecastItem,
  city_id: number
): DailyForecast {
  const weather = item.weather[0]; // thường chỉ có 1 phần tử

  const entity = new DailyForecast();
  entity.df_date = item.dt;
  entity.sunrise = item.sunrise;
  entity.sunset = item.sunset;
  entity.moonrise = 0; // không có trong API này
  entity.moonset = 0;

  entity.icon = weather.icon;
  entity.summary = weather.description;

  entity.temperature_max = item.temp.max;
  entity.temperature_min = item.temp.min;
  entity.temperature_day = item.temp.day;
  entity.temperature_morn = item.temp.morn;
  entity.temperature_eve = item.temp.eve;
  entity.temperature_night = item.temp.night;

  entity.feels_like_day = item.feels_like.day;
  entity.feels_like_morn = item.feels_like.morn;
  entity.feels_like_eve = item.feels_like.eve;
  entity.feels_like_night = item.feels_like.night;

  entity.pressure = item.pressure;
  entity.humidity = item.humidity;
  entity.wind_speed = item.speed;
  entity.clouds = item.clouds;
  entity.uv = 0; // không có trong response, nếu dùng One Call thì có
  entity.aqi = 0; // cũng không có
  entity.pop = item.pop;

  entity.weather_condition_id = weather.id;
  entity.city_id = city_id;

  return entity;
}
