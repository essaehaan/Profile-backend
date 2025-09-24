import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    findAll(): Promise<import("./course.entity").Course[]>;
    create(dto: CreateCourseDto): Promise<import("./course.entity").Course>;
    update(id: string, dto: UpdateCourseDto): Promise<import("./course.entity").Course>;
    uploadPicture(id: string, file: any): Promise<import("./course.entity").Course>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
