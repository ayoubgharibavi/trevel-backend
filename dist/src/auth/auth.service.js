"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const config_1 = require("@nestjs/config");
const client_1 = require("@prisma/client");
let AuthService = class AuthService {
    constructor(jwtService, prisma, configService) {
        this.jwtService = jwtService;
        this.prisma = prisma;
        this.configService = configService;
    }
    async login(identifier, password) {
        try {
            console.log('Login attempt:', { identifier, password });
            const user = await this.prisma.user.findFirst({
                where: {
                    OR: [
                        { email: identifier },
                        { username: identifier }
                    ]
                }
            });
            console.log('Found user:', user ? { id: user.id, email: user.email, username: user.username, status: user.status } : 'null');
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            const passwordMatch = await bcrypt.compare(password, user.passwordHash);
            console.log('Password match:', passwordMatch);
            if (!passwordMatch) {
                throw new common_1.UnauthorizedException('Invalid password');
            }
            if (user.status !== 'ACTIVE') {
                throw new common_1.UnauthorizedException('Your account is inactive');
            }
            const payload = { sub: user.id, username: user.username, role: user.role };
            const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '24h' });
            const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '30d' });
            const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
            const refreshTokenExpiry = new Date();
            refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 30);
            await this.prisma.refreshToken.create({
                data: {
                    userId: user.id,
                    tokenHash: hashedRefreshToken,
                    expiresAt: refreshTokenExpiry,
                },
            });
            return {
                accessToken,
                refreshToken,
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    status: user.status,
                    canBypassRateLimit: user.canBypassRateLimit,
                    tenantId: user.tenantId,
                    displayCurrencies: user.displayCurrencies ? JSON.parse(user.displayCurrencies) : [],
                    wallet: null,
                    savedPassengers: [],
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
            };
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new common_1.UnauthorizedException('Authentication failed');
        }
    }
    async signup(data) {
        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { username: data.username },
                    { email: data.email },
                ],
            },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Account with this username or email already exists');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const defaultTenantId = this.configService.get('DEFAULT_TENANT_ID') || 'tenant-1';
        const newUser = await this.prisma.user.create({
            data: {
                name: data.name,
                username: data.username,
                email: data.email,
                passwordHash: hashedPassword,
                phone: data.phone,
                role: client_1.UserRole.USER,
                status: 'ACTIVE',
                tenantId: defaultTenantId,
                displayCurrencies: '["IRR"]',
            },
        });
        await this.prisma.wallet.create({
            data: {
                userId: newUser.id,
                balance: 0,
                currency: 'IRR',
            },
        });
        const payload = { sub: newUser.id, username: newUser.username, role: newUser.role };
        const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m' });
        const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' });
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        const refreshTokenExpiry = new Date();
        refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 7);
        await this.prisma.refreshToken.create({
            data: {
                userId: newUser.id,
                tokenHash: hashedRefreshToken,
                expiresAt: refreshTokenExpiry,
            },
        });
        return {
            accessToken,
            refreshToken,
            user: {
                id: newUser.id,
                username: newUser.username,
                role: newUser.role,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                status: newUser.status,
                canBypassRateLimit: newUser.canBypassRateLimit,
                tenantId: newUser.tenantId,
                displayCurrencies: newUser.displayCurrencies ? JSON.parse(newUser.displayCurrencies) : [],
                wallet: {
                    balance: 0,
                    currency: 'IRR',
                },
                savedPassengers: [],
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt,
            },
        };
    }
    async refresh(refreshToken) {
        try {
            if (!refreshToken) {
                throw new common_1.UnauthorizedException('Refresh token is required');
            }
            const payload = await this.jwtService.verifyAsync(refreshToken);
            const storedToken = await this.prisma.refreshToken.findFirst({
                where: { userId: payload.sub },
            });
            if (!storedToken || storedToken.expiresAt < new Date()) {
                throw new common_1.UnauthorizedException('Invalid or expired refresh token');
            }
            const newPayload = { sub: payload.sub, username: payload.username, role: payload.role };
            const newAccessToken = await this.jwtService.signAsync(newPayload, { expiresIn: '24h' });
            return { accessToken: newAccessToken };
        }
        catch (error) {
            console.error('Refresh token error:', error);
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
    }
    async logout(userId) {
        await this.prisma.refreshToken.deleteMany({
            where: { userId },
        });
        return { message: 'Logged out successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map