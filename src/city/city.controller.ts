import { Controller, Get, Query } from '@nestjs/common';
import { CityService } from './city.service';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('suggest')
  async suggest(@Query('keyword') keyword: string) {
    const result = await this.cityService.suggestNameCities(keyword);
    return ApiResponse.success(result, 'Get city list suggestion successfully');
  }
}
