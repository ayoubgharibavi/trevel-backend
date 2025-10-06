import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly jwtService;
    private readonly prisma;
    private readonly configService;
    constructor(jwtService: JwtService, prisma: PrismaService, configService: ConfigService);
    login(identifier: string, password: string): Promise<{
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
    signup(data: {
        name: string;
        username: string;
        email: string;
        password: string;
        phone: string;
    }): Promise<{
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
    refresh(refreshToken: string): Promise<{
        accessToken: string;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
}
