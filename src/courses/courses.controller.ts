import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';

@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoursesController {
	constructor(private readonly coursesService: CoursesService) {}

	@Get()
	@Roles('admin', 'user')
	findAll() {
		return this.coursesService.findAll();
	}

	@Post()
	@Roles('admin')
	create(@Body() dto: CreateCourseDto) {
		return this.coursesService.create(dto);
	}

	@Patch(':id')
	@Roles('admin')
	update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
		return this.coursesService.update(id, dto);
	}

	@Post(':id/picture')
	@Roles('admin')
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: (_req, _file, cb) => {
					const dest = join(process.cwd(), 'uploads', 'courses');
					if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
					cb(null, dest);
				},
				filename: (_req, file, cb) => {
					const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
					cb(null, unique + extname(file.originalname));
				},
			}),
			limits: { fileSize: 5 * 1024 * 1024 },
		})
	)
	uploadPicture(@Param('id') id: string, @UploadedFile() file: any) {
		const relativePath = `/uploads/courses/${file.filename}`;
		return this.coursesService.update(id, { picture: relativePath } as UpdateCourseDto);
	}

	@Delete(':id')
	@Roles('admin')
	remove(@Param('id') id: string) {
		return this.coursesService.remove(id);
	}
} 