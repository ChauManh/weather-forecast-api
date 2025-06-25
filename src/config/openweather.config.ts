import { registerAs } from '@nestjs/config';

export default registerAs('openweather', () => ({
  apiKey: process.env.OPENWEATHER_API_KEY,
}));
