import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

const config: ConfigService = new ConfigService();

enum DataType {
  MYSQL = 'mysql',
}

export default () => ({
  app: {
    name: config.get<string>('APP_NAME'),
    port: config.get<number>('APP_PORT') || 3000,
    timezone: config.get<string>('APP_TIMEZONE') || 'Africa/Lagos',
  },
  mysql: {
    type: DataType.MYSQL,
    host: config.get<string>('DB_HOST') || 'localhost',
    port: config.get<number>('DB_PORT') || 3306,
    username: config.get<string>('DB_USERNAME') || 'root',
    password: config.get<string>('DB_PASSWORD') || '',
    database: config.get<string>('DB_NAME'),
    synchronize: true, // Set to false in production
  },
});
