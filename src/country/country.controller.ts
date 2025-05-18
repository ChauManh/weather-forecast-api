import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from './country.service';
import { get } from 'http';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  getAllCountries() {
    return this.countryService.findAll();
  }

  @Get(':id')
  getCountryById(@Param('id') id: string) {
    return this.countryService.findById(id);
  }
}
