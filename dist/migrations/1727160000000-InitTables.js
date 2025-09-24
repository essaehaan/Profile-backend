"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitTables1727160000000 = void 0;
class InitTables1727160000000 {
    constructor() {
        this.name = 'InitTables1727160000000';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "users" (
			"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
			"name" varchar(120) NOT NULL,
			"email" varchar(160) NOT NULL UNIQUE,
			"password" varchar NOT NULL,
			"role" varchar(16) NOT NULL DEFAULT 'user',
			"createdAt" TIMESTAMP NOT NULL DEFAULT now()
		)`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "courses" (
			"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
			"title" varchar(150) NOT NULL,
			"description" text NOT NULL,
			"price" numeric(10,2) NOT NULL,
			"createdAt" TIMESTAMP NOT NULL DEFAULT now()
		)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS "courses"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
    }
}
exports.InitTables1727160000000 = InitTables1727160000000;
//# sourceMappingURL=1727160000000-InitTables.js.map