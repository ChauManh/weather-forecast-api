import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from 'src/city/city.entity';
import { Country } from 'src/country/country.entity';
import { Repository } from 'typeorm';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'csv-parse/sync';
import { UserAlertType } from 'src/user/user-alert-type.entity';
import { WeatherCondition } from 'src/weather-condition/weather-condition.entity';
import { User } from 'src/user/user.entity';
import { hashPassword } from 'src/utils/hash.util';
import { ConfigService } from '@nestjs/config';

interface CityCSVRow {
  city_id: string;
  city_name: string;
  country_id: string;
  latitude: string;
  longitude: string;
}

interface CountryCSVRow {
  country_id: string;
  country_name: string;
}

interface UserAlertTypeCSVRow {
  alert_type_id: string;
  alert_description: string;
}

interface WeatherConditionCSVRow {
  weather_condition_id: string;
  main: string;
  weather_description: string;
}

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(City) private cityRepo: Repository<City>,
    @InjectRepository(Country) private countryRepo: Repository<Country>,
    @InjectRepository(UserAlertType)
    private userAlertTypeRepo: Repository<UserAlertType>,
    @InjectRepository(WeatherCondition)
    private WeatherConditionRepo: Repository<WeatherCondition>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private config: ConfigService
  ) {}

  async seedCountriesFromCSV() {
    const count = await this.countryRepo.count();
    if (count > 0) {
      console.log('Countries already seeded.');
      return;
    }

    const filePath = join(
      process.cwd(),
      'src',
      'seeder',
      'data',
      'country.csv'
    );
    const file = readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
    console.log(`reading ${filePath}`);
    console.log(`seeding countries...`);
    const records = parse(file, {
      columns: true,
      skip_empty_lines: true,
    }) as CountryCSVRow[];

    const countries: Country[] = records.map((row) => {
      const country = new Country();
      country.country_id = row.country_id;
      country.country_name = row.country_name;
      return country;
    });
    await this.countryRepo.save(countries);
    console.log(`Seeded ${countries.length} countries`);
  }

  async seedCitiesFromCSV() {
    const count = await this.cityRepo.count();
    if (count > 0) {
      console.log('Cities already seeded.');
      return;
    }
    const filePath = join(process.cwd(), 'src', 'seeder', 'data', 'city.csv');
    const file = readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
    console.log(`reading ${filePath}`);
    console.log(`seeding cities...`);
    const records = parse(file, {
      columns: true,
      skip_empty_lines: true,
    }) as CityCSVRow[];

    const cities: City[] = records.map((row) => {
      const city = new City();
      city.city_id = parseInt(row.city_id);
      city.city_name = row.city_name;
      city.latitude = parseFloat(row.latitude);
      city.longitude = parseFloat(row.longitude);
      city.country = { country_id: row.country_id } as Country;
      return city;
    });

    await this.cityRepo.save(cities);
    console.log(`Seeded ${cities.length} cities`);
  }

  async seedUserAlertTypesFromCSV() {
    const count = await this.userAlertTypeRepo.count();
    if (count > 0) {
      console.log('UserAlertTypes already seeded.');
      return;
    }

    const filePath = join(
      process.cwd(),
      'src',
      'seeder',
      'data',
      'userAlertType.csv'
    );
    const file = readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
    console.log(`reading ${filePath}`);
    console.log(`seeding user alert types...`);
    const records = parse(file, {
      columns: true,
      skip_empty_lines: true,
    }) as UserAlertTypeCSVRow[];

    const alertTypes = records.map((row) => ({
      alert_type_id: parseInt(row.alert_type_id),
      alert_description: row.alert_description,
    }));

    await this.userAlertTypeRepo.save(alertTypes);
    console.log(`Seeded ${alertTypes.length} user alert types`);
  }

  async seedWeatherConditionsFromCSV() {
    const count = await this.WeatherConditionRepo.count(); // dùng getRepository nếu chưa inject
    if (count > 0) {
      console.log('WeatherConditions already seeded.');
      return;
    }

    const filePath = join(
      process.cwd(),
      'src',
      'seeder',
      'data',
      'weatherCondition.csv'
    );
    const file = readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
    console.log(`reading ${filePath}`);
    console.log(`seeding weather conditions...`);
    const records = parse(file, {
      columns: true,
      skip_empty_lines: true,
    }) as WeatherConditionCSVRow[];

    const conditions = records.map((row) => ({
      weather_condition_id: parseInt(row.weather_condition_id),
      main: row.main,
      weather_description: row.weather_description,
    }));

    await this.WeatherConditionRepo.save(conditions);
    console.log(`Seeded ${conditions.length} weather conditions`);
  }

  async seedAdminUser() {
    const existing = await this.userRepo.findOne({
      where: { username: 'admin' },
    });
    if (existing) {
      console.log('Admin user already exists');
      return;
    }

    const admin = new User();
    admin.username = 'admin';
    admin.email = 'admin@gmail.com';
    const rawPassword = this.config.get<string>('adminPassword');
    if (!rawPassword) throw new Error('ADMIN_PASSWORD is not defined');
    admin.password = await hashPassword(rawPassword);
    admin.role = 'ADMIN';

    await this.userRepo.save(admin);
    console.log('Seeded admin user');
  }

  async seederAllData() {
    console.log(`Start seeding all data`);
    await this.seedAdminUser();
    await this.seedUserAlertTypesFromCSV();
    await this.seedWeatherConditionsFromCSV();
    await this.seedCountriesFromCSV();
    await this.seedCitiesFromCSV();
    console.log(`Seeded all data successfully`);
  }
}
