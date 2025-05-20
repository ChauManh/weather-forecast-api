import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { City } from 'src/city/city.entity';
import { WeatherCondition } from 'src/weather-condition/weather-condition.entity';

@Entity('CurrentWeather')
export class CurrentWeather {
  @PrimaryGeneratedColumn()
  current_weather_id: number;

  @Column()
  city_id: number;

  @Column()
  weather_condition_id: number;

  @Column('bigint')
  cur_timestamp: number;

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

  @Column('int')
  aqi: number;

  @OneToOne(() => City, (city) => city.currentWeather)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @ManyToOne(() => WeatherCondition, (wc) => wc.currentWeather)
  @JoinColumn({ name: 'weather_condition_id' })
  weatherCondition: WeatherCondition;
}
