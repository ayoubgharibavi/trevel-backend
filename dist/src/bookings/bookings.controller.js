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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const bookings_service_1 = require("./bookings.service");
const dto_1 = require("../common/dto");
let BookingsController = class BookingsController {
    constructor(bookingsService) {
        this.bookingsService = bookingsService;
    }
    async getBookings(req) {
        return this.bookingsService.getUserBookings(req.user.userId);
    }
    async createBooking(req, body) {
        console.log('🔍 DEBUG - createBooking req.user:', req.user);
        console.log('🔍 DEBUG - Using userId:', req.user.userId);
        return this.bookingsService.createBooking(body, req.user.userId);
    }
    async createManualBooking(req, body) {
        console.log('🔍 DEBUG - req.user:', req.user);
        console.log('🔍 DEBUG - Using userId:', req.user.userId);
        return this.bookingsService.createManualBooking(body, req.user.userId);
    }
    async getBooking(req, bookingId) {
        return this.bookingsService.getBookingById(bookingId, req.user.userId);
    }
    async cancelBooking(req, bookingId, body) {
        return this.bookingsService.cancelBooking(bookingId, req.user.userId);
    }
    async getETicket(req, bookingId) {
        return this.bookingsService.getETicketData(req.user.userId, bookingId);
    }
    async downloadETicketPDF(req, bookingId, res) {
        try {
            const pdfBuffer = await this.bookingsService.generateETicketPDF(req.user.userId, bookingId);
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="e-ticket-${bookingId}.pdf"`,
                'Content-Length': pdfBuffer.length,
            });
            res.send(pdfBuffer);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to generate PDF' });
        }
    }
};
exports.BookingsController = BookingsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get user bookings' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "getBookings", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create booking' }),
    (0, swagger_1.ApiBody)({ type: dto_1.CreateBookingDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CreateBookingDto]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "createBooking", null);
__decorate([
    (0, common_1.Post)('manual'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create manual booking' }),
    (0, swagger_1.ApiBody)({ type: dto_1.CreateBookingDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CreateBookingDto]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "createManualBooking", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get booking details' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "getBooking", null);
__decorate([
    (0, common_1.Put)(':id/cancel'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel booking' }),
    (0, swagger_1.ApiBody)({ type: dto_1.CancelBookingDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.CancelBookingDto]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "cancelBooking", null);
__decorate([
    (0, common_1.Get)(':id/e-ticket'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get e-ticket' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "getETicket", null);
__decorate([
    (0, common_1.Get)(':id/e-ticket/pdf'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Download e-ticket as PDF' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "downloadETicketPDF", null);
exports.BookingsController = BookingsController = __decorate([
    (0, swagger_1.ApiTags)('bookings'),
    (0, common_1.Controller)({ path: 'bookings', version: '1' }),
    __metadata("design:paramtypes", [bookings_service_1.BookingsService])
], BookingsController);
//# sourceMappingURL=bookings.controller.js.map