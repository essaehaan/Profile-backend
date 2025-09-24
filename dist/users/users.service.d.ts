import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly usersRepo;
    constructor(usersRepo: Repository<User>);
    create(data: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
    findByEmailWithPassword(email: string): Promise<User | null>;
    ensureAdminUser(name: string, email: string, rawPassword: string): Promise<User>;
}
