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
exports.FlightsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const flights_service_1 = require("./flights.service");
const dto_1 = require("../common/dto");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let FlightsController = class FlightsController {
    constructor(flightsService) {
        this.flightsService = flightsService;
    }
    async search(query, req) {
        return this.flightsService.search(query, req.user);
    }
    async getPopularRoutes() {
        return this.flightsService.getPopularRoutes();
    }
    async getDailyPrices(from, to, month) {
        return this.flightsService.getDailyPrices(from, to, month);
    }
    async cancelPastFlights(req) {
        if (!req.user || !['SUPER_ADMIN', 'ADMIN'].includes(req.user.role)) {
            throw new common_1.UnauthorizedException('Only admin users can cancel flights');
        }
        return this.flightsService.cancelPastFlights();
    }
    async getById(flightId) {
        return this.flightsService.getById(flightId);
    }
    async aiSearch(query, language = 'fa', req) {
        return this.flightsService.aiSearch(query, language, req.user);
    }
    async saveCharter118(data) {
        return this.flightsService.saveCharter118Flight(data.flight, data.charter118BookingId);
    }
    async createFlight(createFlightDto) {
        return this.flightsService.createFlight(createFlightDto);
    }
    async updateFlight(flightId, updateFlightDto) {
        return this.flightsService.updateFlight(flightId, updateFlightDto);
    }
    async deleteFlight(flightId) {
        return this.flightsService.deleteFlight(flightId);
    }
    async searchAirports(searchTerm) {
        return this.flightsService.searchAirports(searchTerm);
    }
};
exports.FlightsController = FlightsController;
__decorate([
    (0, common_1.Get)('search'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Search flights' }),
    (0, swagger_1.ApiQuery)({ name: 'from', type: String, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'to', type: String, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'departureDate', type: String, required: true, description: 'YYYY-MM-DD' }),
    (0, swagger_1.ApiQuery)({ name: 'adults', type: Number, required: false, description: 'Defaults to 1' }),
    (0, swagger_1.ApiQuery)({ name: 'children', type: Number, required: false, description: 'Defaults to 0' }),
    (0, swagger_1.ApiQuery)({ name: 'infants', type: Number, required: false, description: 'Defaults to 0' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of flights' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FlightSearchQueryDto, Object]),
    __metadata("design:returntype", Promise)
], FlightsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('popular-routes'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get popular flight routes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FlightsController.prototype, "getPopularRoutes", null);
__decorate([
    (0, common_1.Get)('daily-prices'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get daily flight prices for a route' }),
    (0, swagger_1.ApiQuery)({ name: 'from', type: String, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'to', type: String, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'month', type: String, required: false, description: 'YYYY-MM format, defaults to current month' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Daily prices for the specified month' }),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __param(2, (0, common_1.Query)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], FlightsController.prototype, "getDailyPrices", null);
__decorate([
    (0, common_1.Post)('cancel-past-flights'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Manually cancel all past flights' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Past flights cancelled successfully' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FlightsController.prototype, "cancelPastFlights", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get flight by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FlightsController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)('ai-search'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'AI-powered flight search using Gemini' }),
    (0, swagger_1.ApiQuery)({ name: 'language', required: false }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('language')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FlightSearchQueryDto, Object, Object]),
    __metadata("design:returntype", Promise)
], FlightsController.prototype, "aiSearch", null);
__decorate([
    (0, common_1.Post)('save-charter118'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Save Charter118 flight to local database' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Charter118 flight saved successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FlightsController.prototype, "saveCharter118", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new flight' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateFlightDto]),
    __metadata("design:returntype", Promise)
], FlightsController.prototype, "createFlight", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a flight' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateFlightDto]),
    __metadata("design:returntype", Promise)
], FlightsController.prototype, "updateFlight", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a flight' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FlightsController.prototype, "deleteFlight", null);
__decorate([
    (0, common_1.Get)('airports/search'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Search airports by city or code' }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: true }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FlightsController.prototype, "searchAirports", null);
exports.FlightsController = FlightsController = __decorate([
    (0, swagger_1.ApiTags)('flights'),
    (0, common_1.Controller)({ path: 'flights', version: '1' }),
    __metadata("design:paramtypes", [flights_service_1.FlightsService])
], FlightsController);
//# sourceMappingURL=flights.controller.js.map