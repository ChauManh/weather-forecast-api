export interface OpenWeatherHistoryItem {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level?: number;
    grnd_level?: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
}

export interface OpenWeatherHistoryResponse {
  message: string;
  cod: string;
  city_id: number;
  calctime: number;
  cnt: number;
  list: OpenWeatherHistoryItem[];
}
