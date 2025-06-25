import { v2 as cloudinary } from 'cloudinary';
import { ConfigType } from '@nestjs/config';
import cloudinaryConfig from '../../config/cloudinary.config';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: (config: ConfigType<typeof cloudinaryConfig>) => {
    cloudinary.config({
      cloud_name: config.cloud_name,
      api_key: config.api_key,
      api_secret: config.api_secret,
    });
    return cloudinary;
  },
  inject: [cloudinaryConfig.KEY],
};
