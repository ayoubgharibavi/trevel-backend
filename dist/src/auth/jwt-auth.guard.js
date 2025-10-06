"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const public_decorator_1 = require("./decorators/public.decorator");
let JwtAuthGuard = class JwtAuthGuard {
    constructor(jwtService, reflector, configService) {
        this.jwtService = jwtService;
        this.reflector = reflector;
        this.configService = configService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const url = request.url;
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log('🔍 JWT Guard - URL:', url, 'isPublic:', isPublic, 'Handler:', context.getHandler().name, 'Class:', context.getClass().name);
        if (isPublic) {
            console.log('✅ Public route, allowing access');
            return true;
        }
        console.log('🔒 Protected route, checking token');
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            console.log('❌ No token provided for protected route');
            throw new common_1.UnauthorizedException();
        }
        try {
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_SECRET') || 'dev-access-secret',
            });
            request['user'] = { userId: payload.sub, username: payload.username, role: payload.role };
            console.log('✅ Token valid for protected route, user set:', payload.sub);
            return true;
        }
        catch (error) {
            console.log('❌ Invalid token for protected route:', error.message);
            throw new common_1.UnauthorizedException();
        }
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        core_1.Reflector,
        config_1.ConfigService])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map