import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './city.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepo: Repository<City>
  ) {}

  async suggestNameCities(keyword: string): Promise<object[]> {
    const cities = await this.cityRepo.find({
      where: { city_name: ILike(`%${keyword}%`) },
      take: 10,
      relations: ['country'],
    });
    return cities.map((city) => ({
      city_id: city.city_id,
      city_name: city.city_name,
      country_name: city.country?.country_name || 'Unknown',
    }));
  }

  async getCityById(city_id: number): Promise<City> {
    const city = await this.cityRepo.findOne({
      where: { city_id: city_id },
    });

    if (!city) {
      throw new NotFoundException('City not found');
    }

    return city;
  }
}
