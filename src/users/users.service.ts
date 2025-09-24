import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private readonly usersRepo: Repository<User>) {}

	create(data: CreateUserDto) {
		const entity = this.usersRepo.create(data);
		return this.usersRepo.save(entity);
	}

	findAll() {
		return this.usersRepo.find();
	}

	findByEmail(email: string) {
		return this.usersRepo.findOne({ where: { email } });
	}

	findByEmailWithPassword(email: string) {
		return this.usersRepo
			.createQueryBuilder('user')
			.addSelect('user.password')
			.where('user.email = :email', { email })
			.getOne();
	}

	async ensureAdminUser(name: string, email: string, rawPassword: string) {
		const existing = await this.findByEmail(email);
		const hashed = await bcrypt.hash(rawPassword, 10);
		if (!existing) {
			const entity = this.usersRepo.create({ name, email, password: hashed, role: 'admin' });
			return this.usersRepo.save(entity);
		}
		existing.name = name;
		existing.password = hashed;
		existing.role = 'admin';
		return this.usersRepo.save(existing);
	}
} 