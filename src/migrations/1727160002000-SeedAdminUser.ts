import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from 'bcrypt';

export class SeedAdminUser1727160002000 implements MigrationInterface {
	name = 'SeedAdminUser1727160002000'

	public async up(queryRunner: QueryRunner): Promise<void> {
		const email = 'developeressaehaan@gmail.com';
		const name = 'Essa Ehaan';
		const rawPassword = 'essa@321@';
		const existing = await queryRunner.query(`SELECT id FROM "users" WHERE email = $1`, [email]);
		if (existing.length === 0) {
			const hash = await bcrypt.hash(rawPassword, 10);
			await queryRunner.query(
				`INSERT INTO "users" ("name", "email", "password", "role") VALUES ($1, $2, $3, $4)`,
				[name, email, hash, 'admin']
			);
		}
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const email = 'developeressaehaan@gmail.com';
		await queryRunner.query(`DELETE FROM "users" WHERE email = $1`, [email]);
	}
} 