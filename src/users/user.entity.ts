import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

export type UserRole = 'admin' | 'user';

@Entity('users')
@Unique(['email'])
export class User {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ length: 120 })
	name!: string;

	@Column({ length: 160 })
	email!: string;

	@Column({ select: false })
	password!: string;

	@Column({ type: 'varchar', length: 16, default: 'user' })
	role!: UserRole;

	@CreateDateColumn()
	createdAt!: Date;
} 