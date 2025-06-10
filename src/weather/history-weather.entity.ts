// src/entities/history-weather.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { City } from 'src/city/city.entity';
import { WeatherCondition } from 'src/weather-condition/weather-condition.entity';

@Entity('HistoryWeather')
@Index(['city_id', 'timestamp'], { unique: true })
export class HistoryWeather {
  @PrimaryGeneratedColumn()
  history_weather_id: number;

  @Column()
  city_id: number;

  @Column()
  weather_condition_id: number;

  @Column('bigint')
  timestamp: number;

  @Column({ length: 5 })
  icon: string;

  @Column('float')
  temperature: number;

  @Column('float')
  temperature_min: number;

  @Column('float')
  temperature_max: number;

  @Column('int')
  pressure: number;

  @Column('int')
  humidity: number;

  @Column('float')
  wind_speed: number;

  @Column('int')
  wind_deg: number;

  @Column('int')
  clouds: number;

  @ManyToOne(() => City, (city) => city.historyWeathers)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @ManyToOne(() => WeatherCondition, (wc) => wc.historyWeathers)
  @JoinColumn({ name: 'weather_condition_id' })
  weatherCondition: WeatherCondition;
}
