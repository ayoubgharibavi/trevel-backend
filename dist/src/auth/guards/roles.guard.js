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
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const roles_decorator_1 = require("../decorators/roles.decorator");
let RolesGuard = class RolesGuard {
    constructor(reflector, jwtService, configService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log('Required roles:', requiredRoles);
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        console.log('Token:', token);
        if (!token) {
            console.log('No token found');
            throw new common_1.UnauthorizedException();
        }
        try {
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_SECRET') || 'dev-access-secret'
            });
            console.log('Payload:', payload);
            request['user'] = payload;
            if (!payload.role) {
                console.log('No role in payload');
                return false;
            }
            const hasRole = requiredRoles.some((role) => payload.role === role);
            console.log('Has role:', hasRole, 'User role:', payload.role, 'Required roles:', requiredRoles);
            return hasRole;
        }
        catch (error) {
            console.log('JWT verification error:', error);
            throw new common_1.UnauthorizedException();
        }
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService,
        config_1.ConfigService])
], RolesGuard);
//# sourceMappingURL=roles.guard.js.map