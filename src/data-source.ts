import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = Number(process.env.DB_PORT || 5432);
const DB_USERNAME = process.env.DB_USERNAME || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || '1234';
const DB_NAME = process.env.DB_NAME || 'Profile_db';
const DB_SSL = (process.env.DB_SSL || 'false') === 'true';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: DB_HOST,
	port: DB_PORT,
	username: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_NAME,
	ssl: DB_SSL ? { rejectUnauthorized: false } : false,
	entities: [__dirname + '/**/*.entity.{ts,js}'],
	migrations: [__dirname + '/migrations/*.{ts,js}'],
	logging: false,
	synchronize: false,
}); 