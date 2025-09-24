import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTables1727160000000 implements MigrationInterface {
	name = 'InitTables1727160000000'

	public async up(queryRunner: QueryRunner): Promise<void> {
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

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE IF EXISTS "courses"`);
		await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
	}
} 