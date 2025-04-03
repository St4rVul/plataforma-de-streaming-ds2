import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    firebaseAuth(token: string): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
    login(loginDto: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
}
