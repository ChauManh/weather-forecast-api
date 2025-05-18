import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './country.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country) private countryRepo: Repository<Country>
  ) {}

  findAll() {
    return this.countryRepo.find({ order: { country_name: 'ASC' } });
  }

  findById(id: string) {
    return this.countryRepo.findOne({ where: { country_id: id } });
  }
}
