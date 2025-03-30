import configuration from 'src/libs/configuration';
import { DataSource, DataSourceOptions } from 'typeorm';

const config = configuration();

export const dataSourceOptions: DataSourceOptions = {
  type: config.mysql.type,
  host: config.mysql.host,
  port: config.mysql.port,
  username: config.mysql.username,
  password: config.mysql.password,
  database: config.mysql.database,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  logging: ['error'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
