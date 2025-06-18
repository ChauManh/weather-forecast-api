import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import configuration from './configuration';

export const typeOrmConfig = (
  config: ConfigType<typeof configuration>
): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  autoLoadEntities: true,
  synchronize: config.nodeEnv !== 'production', // true nếu đang dev
});
