import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { City } from 'src/city/city.entity';
import { WeatherCondition } from 'src/weather-condition/weather-condition.entity';

@Entity('DailyForecast')
export class DailyForecast {
  @PrimaryGeneratedColumn()
  daily_forecast_id: number;

  @Column()
  city_id: number;

  @Column()
  weather_condition_id: number;

  @Column('bigint')
  df_date: number;

  @Column({ length: 5 })
  icon: string;

  @Column('bigint')
  sunrise: number;

  @Column('bigint')
  sunset: number;

  @Column('bigint')
  moonrise: number;

  @Column('bigint')
  moonset: number;

  @Column({ length: 100, nullable: true })
  summary: string;

  @Column('float')
  temperature_max: number;

  @Column('float')
  temperature_min: number;

  @Column('float')
  temperature_morn: number;

  @Column('float')
  temperature_day: number;

  @Column('float')
  temperature_eve: number;

  @Column('float')
  temperature_night: number;

  @Column('float')
  feels_like_morn: number;

  @Column('float')
  feels_like_day: number;

  @Column('float')
  feels_like_eve: number;

  @Column('float')
  feels_like_night: number;

  @Column('int')
  pressure: number;

  @Column('int')
  humidity: number;

  @Column('float')
  wind_speed: number;

  @Column('int')
  clouds: number;

  @Column('float')
  uv: number;

  @Column('float')
  pop: number;

  @Column('int')
  aqi: number;

  @ManyToOne(() => City, (city) => city.dailyForecasts)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @ManyToOne(() => WeatherCondition, (wc) => wc.dailyForecasts)
  @JoinColumn({ name: 'weather_condition_id' })
  weatherCondition: WeatherCondition;
}
