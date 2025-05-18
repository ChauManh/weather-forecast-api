import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './country.entity';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  exports: [TypeOrmModule],
  providers: [CountryService],
  controllers: [CountryController],
})
export class CountryModule {}
