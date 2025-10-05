"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const course_entity_1 = require("./course.entity");
let CoursesService = class CoursesService {
    constructor(coursesRepo) {
        this.coursesRepo = coursesRepo;
    }
    findAll() {
        return this.coursesRepo.find({ order: { createdAt: 'DESC' } });
    }
    async findOne(id) {
        const course = await this.coursesRepo.findOne({ where: { id } });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        return course;
    }
    async create(dto) {
        const entity = this.coursesRepo.create(Object.assign(Object.assign({}, dto), { price: dto.price.toFixed(2) }));
        return this.coursesRepo.save(entity);
    }
    async update(id, dto) {
        const existing = await this.coursesRepo.findOne({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException('Course not found');
        if (dto.price !== undefined) {
            existing.price = dto.price.toFixed(2);
        }
        if (dto.title !== undefined)
            existing.title = dto.title;
        if (dto.description !== undefined)
            existing.description = dto.description;
        if (dto.picture !== undefined)
            existing.picture = dto.picture;
        return this.coursesRepo.save(existing);
    }
    async remove(id) {
        const existing = await this.coursesRepo.findOne({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException('Course not found');
        await this.coursesRepo.remove(existing);
        return { success: true };
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CoursesService);
//# sourceMappingURL=courses.service.js.map