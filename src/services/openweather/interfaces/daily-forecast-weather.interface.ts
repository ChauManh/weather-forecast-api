export interface OpenWeatherDailyForecastResponse {
  city: {
    id: number;
    name: string;
    coord: {
      lon: number;
      lat: number;
    };
    country: string;
    population: number;
    timezone: number;
  };
  cod: string;
  message: number;
  cnt: number;
  list: OpenWeatherDailyForecastItem[];
}

export interface OpenWeatherDailyForecastItem {
  dt: number;
  sunrise: number;
  sunset: number;

  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };

  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };

  pressure: number;
  humidity: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];

  speed: number;
  deg: number;
  gust?: number;

  clouds: number;
  pop: number;
  rain?: number;
}
