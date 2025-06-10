import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Column,
  OneToOne,
} from 'typeorm';
import { Country } from 'src/country/country.entity';
import { CurrentWeather } from 'src/weather/current-weather.entity';
import { DailyForecast } from 'src/weather/daily-forecast.entity';
import { HourlyForecast } from 'src/weather/hourly-forecast.entity';
import { HistoryWeather } from 'src/weather/history-weather.entity';

@Entity('City')
export class City {
  @PrimaryColumn()
  city_id: number;

  @Column({ length: 50 })
  city_name: string;

  @Column({ length: 3 })
  country_id: number;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @ManyToOne(() => Country, (country) => country.cities)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @OneToOne(() => CurrentWeather, (cw) => cw.city)
  currentWeather: CurrentWeather[];

  @OneToMany(() => DailyForecast, (df) => df.city)
  dailyForecasts: DailyForecast[];

  @OneToMany(() => HourlyForecast, (hf) => hf.city)
  hourlyForecasts: HourlyForecast[];

  @OneToMany(() => HistoryWeather, (hw) => hw.city)
  historyWeathers: HistoryWeather[];
}
