import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as fs from 'fs';
import { UsersService } from 'users/users.service';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	// CORS for frontend
	app.enableCors({
		origin: ['http://localhost:5173'],
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	});

	// Ensure uploads directory exists and serve it statically
	const uploadsRoot = join(process.cwd(), 'uploads');
	if (!fs.existsSync(uploadsRoot)) {
		fs.mkdirSync(uploadsRoot, { recursive: true });
	}
	app.useStaticAssets(uploadsRoot, { prefix: '/uploads/' });

	// Ensure admin user exists
	const usersService = app.get(UsersService);
	await usersService.ensureAdminUser('Essa Ehaan', 'developeressaehaan@gmail.com', 'essa@321@');

	const configService = app.get(ConfigService);
	const port = configService.get<number>('PORT') || 4000;
	await app.listen(port);
	// eslint-disable-next-line no-console
	console.log(`API running on http://localhost:${port}`);
}
bootstrap(); 