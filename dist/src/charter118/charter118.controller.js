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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var Charter118Controller_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Charter118Controller = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const charter118_service_1 = require("./charter118.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const public_decorator_1 = require("../auth/decorators/public.decorator");
let Charter118Controller = Charter118Controller_1 = class Charter118Controller {
    constructor(charter118Service) {
        this.charter118Service = charter118Service;
        this.logger = new common_1.Logger(Charter118Controller_1.name);
    }
    async searchFlights(searchRequest) {
        this.logger.log(`Flight search request: ${searchRequest.origin} → ${searchRequest.destination}`);
        const result = await this.charter118Service.searchFlights(searchRequest);
        if (!result.success) {
            this.logger.warn(`Flight search failed: ${result.error}`);
        }
        return result;
    }
    async getFlightDetails(flightId) {
        this.logger.log(`Getting flight details for ID: ${flightId}`);
        const result = await this.charter118Service.getFlightDetails(flightId);
        if (!result.success) {
            this.logger.warn(`Get flight details failed: ${result.error}`);
        }
        return result;
    }
    async bookFlight(bookingRequest) {
        this.logger.log(`Booking request for flight: ${bookingRequest.flightId}`);
        const result = await this.charter118Service.bookFlight(bookingRequest);
        if (!result.success) {
            this.logger.warn(`Booking failed: ${result.error}`);
        }
        else {
            this.logger.log(`Booking successful: ${result.bookingId}`);
        }
        return result;
    }
    async getBookingStatus(bookingId) {
        this.logger.log(`Getting booking status: ${bookingId}`);
        const result = await this.charter118Service.getBookingStatus(bookingId);
        if (!result.success) {
            this.logger.warn(`Get booking status failed: ${result.error}`);
        }
        return result;
    }
    async cancelBooking(bookingId) {
        this.logger.log(`Cancelling booking: ${bookingId}`);
        const result = await this.charter118Service.cancelBooking(bookingId);
        if (!result.success) {
            this.logger.warn(`Cancel booking failed: ${result.error}`);
        }
        else {
            this.logger.log(`Booking cancelled successfully: ${bookingId}`);
        }
        return result;
    }
    async getAirports() {
        this.logger.log('Getting airports list from Charter118');
        const result = await this.charter118Service.getAirports();
        if (!result.success) {
            this.logger.warn(`Get airports failed: ${result.error}`);
        }
        return result;
    }
    async getAirlines() {
        this.logger.log('Getting airlines list from Charter118');
        const result = await this.charter118Service.getAirlines();
        if (!result.success) {
            this.logger.warn(`Get airlines failed: ${result.error}`);
        }
        return result;
    }
    async testConnection() {
        this.logger.log('Testing Charter118 API connection');
        const result = await this.charter118Service.testConnection();
        if (!result.success) {
            this.logger.warn(`Connection test failed: ${result.message}`);
        }
        else {
            this.logger.log('Charter118 API connection test successful');
        }
        return result;
    }
    async healthCheck() {
        this.logger.log('Checking Charter118 API health');
        const result = await this.charter118Service.testConnection();
        return {
            service: 'Charter118 Integration',
            status: result.success ? 'healthy' : 'unhealthy',
            message: result.message,
            timestamp: new Date().toISOString(),
            data: result.data
        };
    }
};
exports.Charter118Controller = Charter118Controller;
__decorate([
    (0, common_1.Post)('search'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'جستجوی پروازها در Charter118' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'نتایج جستجوی پروازها' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'درخواست نامعتبر' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Charter118Controller.prototype, "searchFlights", null);
__decorate([
    (0, common_1.Get)('flight/:id'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت جزئیات پرواز از Charter118' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'جزئیات پرواز' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'پرواز یافت نشد' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], Charter118Controller.prototype, "getFlightDetails", null);
__decorate([
    (0, common_1.Post)('book'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPER_ADMIN', 'USER'),
    (0, swagger_1.ApiOperation)({ summary: 'رزرو پرواز در Charter118' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'رزرو موفقیت‌آمیز' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'درخواست رزرو نامعتبر' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Charter118Controller.prototype, "bookFlight", null);
__decorate([
    (0, common_1.Get)('booking/:id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPER_ADMIN', 'USER'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت وضعیت رزرو از Charter118' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'وضعیت رزرو' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'رزرو یافت نشد' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], Charter118Controller.prototype, "getBookingStatus", null);
__decorate([
    (0, common_1.Delete)('booking/:id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPER_ADMIN', 'USER'),
    (0, swagger_1.ApiOperation)({ summary: 'لغو رزرو در Charter118' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'لغو موفقیت‌آمیز' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'رزرو یافت نشد' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], Charter118Controller.prototype, "cancelBooking", null);
__decorate([
    (0, common_1.Get)('airports'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPER_ADMIN', 'USER'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت لیست فرودگاه‌ها از Charter118' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'لیست فرودگاه‌ها' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Charter118Controller.prototype, "getAirports", null);
__decorate([
    (0, common_1.Get)('airlines'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPER_ADMIN', 'USER'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت لیست ایرلاین‌ها از Charter118' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'لیست ایرلاین‌ها' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Charter118Controller.prototype, "getAirlines", null);
__decorate([
    (0, common_1.Get)('test-connection'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPER_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'تست اتصال به Charter118 API' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'نتیجه تست اتصال' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Charter118Controller.prototype, "testConnection", null);
__decorate([
    (0, common_1.Get)('health'),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPER_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'بررسی وضعیت Charter118 API' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'وضعیت API' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Charter118Controller.prototype, "healthCheck", null);
exports.Charter118Controller = Charter118Controller = Charter118Controller_1 = __decorate([
    (0, swagger_1.ApiTags)('Charter118 Integration'),
    (0, common_1.Controller)('charter118'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [charter118_service_1.Charter118Service])
], Charter118Controller);
//# sourceMappingURL=charter118.controller.js.map