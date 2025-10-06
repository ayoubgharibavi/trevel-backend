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
exports.SepehrController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sepehr_api_service_1 = require("./sepehr-api.service");
const dto_1 = require("../common/dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const mock_booking_service_1 = require("./mock-booking.service");
let SepehrController = class SepehrController {
    constructor(sepehrApiService, mockBookingService) {
        this.sepehrApiService = sepehrApiService;
        this.mockBookingService = mockBookingService;
    }
    async searchFlights(searchDto) {
        return this.sepehrApiService.searchFlights(searchDto);
    }
    async checkHealth() {
        const isConnected = await this.sepehrApiService.checkConnection();
        return {
            success: isConnected,
            message: isConnected ? 'Sepehr API is connected' : 'Sepehr API is not available',
            timestamp: new Date().toISOString(),
        };
    }
    async getFlightDetails(flightId) {
        return this.sepehrApiService.getFlightDetails(flightId);
    }
    async bookFlight(bookingDto) {
        const bookingRequest = {
            flightId: bookingDto.flightId,
            passengers: bookingDto.passengers.map(passenger => ({
                name: `${passenger.firstName} ${passenger.lastName}`,
                type: 'adult'
            })),
            contactInfo: {
                email: bookingDto.contactInfo.email,
                phone: bookingDto.contactInfo.phone
            }
        };
        return this.sepehrApiService.bookFlight(bookingRequest);
    }
    async getBookingStatus(bookingId) {
        return this.sepehrApiService.getBookingStatus(bookingId);
    }
    async cancelBooking(bookingId, body) {
        return this.sepehrApiService.cancelBooking(bookingId);
    }
    async getAllBookings() {
        return this.mockBookingService.getAllBookings();
    }
};
exports.SepehrController = SepehrController;
__decorate([
    (0, common_1.Post)('search'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Search flights using Sepehr API' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SepehrFlightSearchDto]),
    __metadata("design:returntype", Promise)
], SepehrController.prototype, "searchFlights", null);
__decorate([
    (0, common_1.Get)('health'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Check Sepehr API health' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SepehrController.prototype, "checkHealth", null);
__decorate([
    (0, common_1.Get)('flight/:id'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get flight details by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SepehrController.prototype, "getFlightDetails", null);
__decorate([
    (0, common_1.Post)('booking'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Book a flight through Sepehr API' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SepehrBookingDto]),
    __metadata("design:returntype", Promise)
], SepehrController.prototype, "bookFlight", null);
__decorate([
    (0, common_1.Get)('booking/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get booking status' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SepehrController.prototype, "getBookingStatus", null);
__decorate([
    (0, common_1.Post)('booking/:id/cancel'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel a booking' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SepehrController.prototype, "cancelBooking", null);
__decorate([
    (0, common_1.Get)('bookings'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all Sepehr bookings' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SepehrController.prototype, "getAllBookings", null);
exports.SepehrController = SepehrController = __decorate([
    (0, swagger_1.ApiTags)('sepehr'),
    (0, common_1.Controller)({ path: 'sepehr', version: '1' }),
    __metadata("design:paramtypes", [sepehr_api_service_1.SepehrApiService,
        mock_booking_service_1.MockBookingService])
], SepehrController);
//# sourceMappingURL=sepehr.controller.js.map