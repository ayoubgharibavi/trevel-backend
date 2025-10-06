import { AuthService } from './auth.service';
import { SignupDto, RefreshDto, LoginDto } from '../common/dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            username: string;
            role: import(".prisma/client").$Enums.UserRole;
            name: string;
            email: string;
            phone: string | null;
            status: "ACTIVE";
            canBypassRateLimit: boolean;
            tenantId: string | null;
            displayCurrencies: string[];
            wallet: null;
            savedPassengers: never[];
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    signup(body: SignupDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            username: string;
            role: import(".prisma/client").$Enums.UserRole;
            name: string;
            email: string;
            phone: string | null;
            status: import(".prisma/client").$Enums.UserStatus;
            canBypassRateLimit: boolean;
            tenantId: string | null;
            displayCurrencies: string[];
            wallet: {
                balance: number;
                currency: string;
            };
            savedPassengers: never[];
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    refresh(body: RefreshDto): Promise<{
        accessToken: string;
    }>;
    logout(req: any): Promise<{
        message: string;
    }>;
}
