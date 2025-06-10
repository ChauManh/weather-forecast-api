// src/dtos/history-weather-response.ts

export interface HistoryWeatherResponse {
  hw_timestamp: number;
  temperature: number;
  temperature_min: number;
  temperature_max: number;
  pressure: number;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
  clouds: number;
  weather_description: string;
  icon: string;
}
