import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CoursesService {
    private readonly coursesRepo;
    constructor(coursesRepo: Repository<Course>);
    findAll(): Promise<Course[]>;
    create(dto: CreateCourseDto): Promise<Course>;
    update(id: string, dto: UpdateCourseDto): Promise<Course>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
