import { Test, TestingModule } from '@nestjs/testing';
import { WeatherConditionController } from './weather-condition.controller';

describe('WeatherConditionController', () => {
  let controller: WeatherConditionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherConditionController],
    }).compile();

    controller = module.get<WeatherConditionController>(WeatherConditionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
