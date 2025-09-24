import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCoursePicture1727160001000 implements MigrationInterface {
	name = 'AddCoursePicture1727160001000'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "picture" varchar(300)`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN IF EXISTS "picture"`);
	}
} 