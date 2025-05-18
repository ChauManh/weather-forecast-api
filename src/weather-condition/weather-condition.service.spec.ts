import { Test, TestingModule } from '@nestjs/testing';
import { WeatherConditionService } from './weather-condition.service';

describe('WeatherConditionService', () => {
  let service: WeatherConditionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherConditionService],
    }).compile();

    service = module.get<WeatherConditionService>(WeatherConditionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
