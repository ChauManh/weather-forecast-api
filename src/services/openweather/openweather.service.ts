import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import openweatherConfig from 'src/config/openweather.config';

@Injectable()
export class OpenWeatherService {
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    @Inject(openweatherConfig.KEY)
    private readonly config: ConfigType<typeof openweatherConfig>
  ) {}

  async call<T = any>(
    endpoint: string,
    params: Record<string, any> = {}
  ): Promise<AxiosResponse<T>> {
    const baseUrl = endpoint.startsWith('/history')
      ? 'https://history.openweathermap.org/data/2.5'
      : 'https://api.openweathermap.org/data/2.5';

    const url = `${baseUrl}${endpoint}`;
    params.appid = this.config.apiKey;

    try {
      return await this.httpService.axiosRef.get<T>(url, { params });
    } catch (error) {
      console.error(
        'OpenWeather API error:',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error?.response?.data || error.message || error
      );
      throw new InternalServerErrorException(
        'Failed to fetch data from OpenWeather API'
      );
    }
  }
}
