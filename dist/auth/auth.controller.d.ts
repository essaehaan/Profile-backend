import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
