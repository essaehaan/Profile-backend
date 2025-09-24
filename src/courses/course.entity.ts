import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('courses')
export class Course {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ length: 150 })
	title!: string;

	@Column({ type: 'text' })
	description!: string;

	@Column({ type: 'decimal', precision: 10, scale: 2 })
	price!: string;

	@Column({ type: 'varchar', length: 300, nullable: true })
	picture?: string;

	@CreateDateColumn()
	createdAt!: Date;
} 