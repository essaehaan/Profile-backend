import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'users/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signup(dto: SignupDto): Promise<{
        id: string;
        name: string;
        email: string;
        role: import("../users/user.entity").UserRole;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
}
