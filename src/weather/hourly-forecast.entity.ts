import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { City } from 'src/city/city.entity';
import { WeatherCondition } from 'src/weather-condition/weather-condition.entity';

@Entity('HourlyForecast')
export class HourlyForecast {
  @PrimaryGeneratedColumn()
  hourly_forecast_id: number;

  @Column()
  city_id: number;

  @Column()
  weather_condition_id: number;

  @Column('bigint')
  hf_timestamp: number;

  @Column({ length: 5 })
  icon: string;

  @Column('float')
  temperature: number;

  @Column('float')
  feels_like: number;

  @Column('int')
  pressure: number;

  @Column('int')
  humidity: number;

  @Column('int')
  clouds: number;

  @Column('float')
  uv: number;

  @Column('int')
  visibility: number;

  @Column('float')
  wind_speed: number;

  @Column('float')
  pop: number;

  @Column('int')
  aqi: number;

  @ManyToOne(() => City, (city) => city.hourlyForecasts)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @ManyToOne(() => WeatherCondition, (wc) => wc.hourlyForecasts)
  @JoinColumn({ name: 'weather_condition_id' })
  weatherCondition: WeatherCondition;
}
