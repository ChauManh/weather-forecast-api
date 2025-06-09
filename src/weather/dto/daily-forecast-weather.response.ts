export interface DailyForecastResponse {
  df_date: number;
  icon: string;
  temperature_max: number;
  temperature_min: number;
  temperature_morn: number;
  temperature_day: number;
  temperature_eve: number;
  temperature_night: number;
  feels_like_morn: number;
  feels_like_day: number;
  feels_like_eve: number;
  feels_like_night: number;
  pressure: number;
  humidity: number;
  clouds: number;
  wind_speed: number;
  uv: number;
  aqi: number;
  pop: number;
  summary?: string;
  weather_description: string;
}
