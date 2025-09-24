"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCoursePicture1727160001000 = void 0;
class AddCoursePicture1727160001000 {
    constructor() {
        this.name = 'AddCoursePicture1727160001000';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "picture" varchar(300)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN IF EXISTS "picture"`);
    }
}
exports.AddCoursePicture1727160001000 = AddCoursePicture1727160001000;
//# sourceMappingURL=1727160001000-AddCoursePicture.js.map