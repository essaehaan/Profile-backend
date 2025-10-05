import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
	constructor(@InjectRepository(Course) private readonly coursesRepo: Repository<Course>) {}

	findAll() {
		return this.coursesRepo.find({ order: { createdAt: 'DESC' } });
	}

	async findOne(id: string) {
		const course = await this.coursesRepo.findOne({ where: { id } });
		if (!course) throw new NotFoundException('Course not found');
		return course;
	}

	async create(dto: CreateCourseDto) {
		const entity = this.coursesRepo.create({ ...dto, price: dto.price.toFixed(2) });
		return this.coursesRepo.save(entity);
	}

	async update(id: string, dto: UpdateCourseDto) {
		const existing = await this.coursesRepo.findOne({ where: { id } });
		if (!existing) throw new NotFoundException('Course not found');
		if (dto.price !== undefined) {
			(existing as any).price = dto.price.toFixed(2);
		}
		if (dto.title !== undefined) existing.title = dto.title;
		if (dto.description !== undefined) existing.description = dto.description;
		if (dto.picture !== undefined) existing.picture = dto.picture;
		return this.coursesRepo.save(existing);
	}

	async remove(id: string) {
		const existing = await this.coursesRepo.findOne({ where: { id } });
		if (!existing) throw new NotFoundException('Course not found');
		await this.coursesRepo.remove(existing);
		return { success: true };
	}
} 