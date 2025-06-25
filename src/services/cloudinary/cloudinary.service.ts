import { Inject, Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject('CLOUDINARY') private readonly cloudinaryClient: typeof cloudinary
  ) {}

  async uploadStream(
    buffer: Buffer,
    folder = 'weatherforecast_user_avatar',
    resourceType: 'image' | 'video' | 'auto' = 'image'
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const stream = this.cloudinaryClient.uploader.upload_stream(
        { folder, resource_type: resourceType },
        (error, result) => {
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          if (error) return reject(error);
          if (!result)
            return reject(new Error('Upload failed with no result.'));
          resolve(result);
        }
      );
      Readable.from(buffer).pipe(stream);
    });
  }
}
