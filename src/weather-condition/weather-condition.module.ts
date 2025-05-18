import { Module } from '@nestjs/common';
import { WeatherConditionService } from './weather-condition.service';
import { WeatherConditionController } from './weather-condition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherCondition } from './weather-condition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherCondition])],
  exports: [TypeOrmModule],
  providers: [WeatherConditionService],
  controllers: [WeatherConditionController],
})
export class WeatherConditionModule {}
