"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./users/user.entity");
const course_entity_1 = require("./courses/course.entity");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const courses_module_1 = require("./courses/courses.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    host: config.get('DB_HOST', 'localhost'),
                    port: parseInt(config.get('DB_PORT', '5432'), 10),
                    username: config.get('DB_USERNAME', 'postgres'),
                    password: config.get('DB_PASSWORD', '1234'),
                    database: config.get('DB_NAME', 'Profile_db'),
                    ssl: config.get('DB_SSL', 'false') === 'true' ? { rejectUnauthorized: false } : false,
                    entities: [user_entity_1.User, course_entity_1.Course],
                    synchronize: config.get('DB_SYNCHRONIZE', 'true') === 'true',
                    logging: false,
                }),
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            courses_module_1.CoursesModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map