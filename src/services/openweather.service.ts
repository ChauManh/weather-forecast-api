import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';

@Injectable()
export class OpenWeatherService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.apiKey = this.configService.get<string>('OPENWEATHER_API_KEY') || '';
  }

  async call<T = any>(
    endpoint: string,
    params: Record<string, any> = {}
  ): Promise<AxiosResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return await this.httpService.axiosRef.get<T>(url, {
      params: {
        ...params,
        appid: this.apiKey,
      },
    });
  }
}
