import { Column, Entity, OneToOne, PrimaryColumn, OneToMany } from 'typeorm';
import { CurrentWeather } from 'src/weather/current-weather.entity';
import { DailyForecast } from 'src/weather/daily-forecast.entity';
import { HourlyForecast } from 'src/weather/hourly-forecast.entity';

@Entity('WeatherCondition')
export class WeatherCondition {
  @PrimaryColumn()
  weather_condition_id: number;

  @Column({ length: 50 })
  main: string;

  @Column({ length: 100 })
  weather_desciption: string;

  @OneToOne(() => CurrentWeather, (cw) => cw.weatherCondition)
  currentWeather: CurrentWeather[];

  @OneToMany(() => DailyForecast, (df) => df.weatherCondition)
  dailyForecasts: DailyForecast[];

  @OneToMany(() => HourlyForecast, (hf) => hf.weatherCondition)
  hourlyForecasts: HourlyForecast[];
}
