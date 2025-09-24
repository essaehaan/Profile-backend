import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Course } from './courses/course.entity';
import { UsersModule } from 'users/users.module';
import { AuthModule } from 'auth/auth.module';
import { CoursesModule } from 'courses/courses.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				type: 'postgres',
				host: config.get<string>('DB_HOST', 'localhost'),
				port: parseInt(config.get<string>('DB_PORT', '5432'), 10),
				username: config.get<string>('DB_USERNAME', 'postgres'),
				password: config.get<string>('DB_PASSWORD', '1234'),
				database: config.get<string>('DB_NAME', 'Profile_db'),
				ssl: config.get<string>('DB_SSL', 'false') === 'true' ? { rejectUnauthorized: false } : false,
				entities: [User, Course],
				synchronize: config.get<string>('DB_SYNCHRONIZE', 'true') === 'true',
				logging: false,
			}),
		}),
		UsersModule,
		AuthModule,
		CoursesModule,
	],
})
export class AppModule {} 