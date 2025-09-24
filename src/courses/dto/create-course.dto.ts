import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCourseDto {
	@IsString()
	@IsNotEmpty()
	title!: string;

	@IsString()
	@IsNotEmpty()
	description!: string;

	@Type(() => Number)
	@IsNumber({ maxDecimalPlaces: 2 })
	@Min(0)
	price!: number;

	@IsOptional()
	@IsString()
	picture?: string;
} 