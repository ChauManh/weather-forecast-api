import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeder/seeder.service';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true, // Cho phép gửi cookie
  });
  app.use(cookieParser());
  // Global validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // Global exception handler
  app.useGlobalFilters(new AllExceptionsFilter());
  const seeder = app.get(SeederService);
  await seeder.seederAllData();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error('Application failed to start:', err);
});
