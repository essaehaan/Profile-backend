import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCourseWithImageDto {
	@IsString()
	@IsNotEmpty()
	title!: string;

	@IsString()
	@IsNotEmpty()
	description!: string;

	@Transform(({ value }) => Number(value))
	@IsNumber({ maxDecimalPlaces: 2 })
	@Min(0)
	price!: number;

	@IsOptional()
	@IsString()
	picture?: string;
}
