import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'users/users.service';

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

	async signup(dto: SignupDto) {
		const existing = await this.usersService.findByEmail(dto.email);
		if (existing) {
			throw new ConflictException('Email already in use');
		}
		const hashed = await bcrypt.hash(dto.password, 10);
		const user = await this.usersService.create({
			name: dto.name,
			email: dto.email,
			password: hashed,
			role: dto.role ?? 'user',
		});
		return { id: user.id, name: user.name, email: user.email, role: user.role };
	}

	async login(dto: LoginDto) {
		const user = await this.usersService.findByEmailWithPassword(dto.email);
		if (!user) throw new UnauthorizedException('Invalid credentials');
		const valid = await bcrypt.compare(dto.password, user.password);
		if (!valid) throw new UnauthorizedException('Invalid credentials');
		const token = await this.jwtService.signAsync({ userId: user.id, role: user.role });
		return { access_token: token };
	}
} 