import { DataSource } from 'typeorm';
import { Todo } from './entity/todo';

const { HOSTNAME, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_PORT } = process.env;

const isProd = !!HOSTNAME;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: isProd ? 'db' : 'localhost',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_USER,
  entities: [Todo],
  synchronize: true,
  logging: true,
  subscribers: [],
  migrations: []
});
