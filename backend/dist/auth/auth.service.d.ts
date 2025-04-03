import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateFirebaseToken(token: string): Promise<any>;
    createOrUpdateUser(firebaseUser: any): Promise<import("../users/entities/user.entity").User>;
    generateJwt(user: any): Promise<{
        access_token: string;
    }>;
    validateUser(email: string, password: string): Promise<any>;
}
