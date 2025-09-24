import { IsEmail, IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class SignupDto {
	@IsString()
	name!: string;

	@IsEmail()
	email!: string;

	@IsString()
	@MinLength(6)
	password!: string;

	@IsOptional()
	@IsIn(['admin', 'user'])
	role?: 'admin' | 'user';
} 