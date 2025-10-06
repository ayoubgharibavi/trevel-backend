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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_service_1 = require("./admin.service");
const dto_1 = require("../common/dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const public_decorator_1 = require("../auth/decorators/public.decorator");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async cancelPastFlights(req) {
        if (!req.user || !['SUPER_ADMIN', 'ADMIN'].includes(req.user.role)) {
            throw new common_1.UnauthorizedException('Only admin users can cancel flights');
        }
        return this.adminService.cancelPastFlights();
    }
    async getStats(req) {
        return this.adminService.getStats();
    }
    async getUsers(page = 1, limit = 10) {
        return this.adminService.getUsers(page, limit);
    }
    async createUser(data) {
        return this.adminService.createUser(data);
    }
    async updateUser(userId, body) {
        return this.adminService.updateUser(userId, body);
    }
    async chargeUserWallet(userId, body) {
        return this.adminService.chargeUserWallet(userId, body.amount, body.currency, body.description);
    }
    async resetUserPassword(userId, body) {
        return this.adminService.resetUserPassword(userId, body.newPassword);
    }
    async getBookings(page = 1, status) {
        return this.adminService.getBookings(page, status);
    }
    async updateBooking(bookingId, bookingData) {
        return this.adminService.updateBooking(bookingId, bookingData);
    }
    async fixBookingSources() {
        return this.adminService.fixBookingSources();
    }
    async forceUpdateBookingSource(bookingId, body) {
        return this.adminService.forceUpdateBookingSource(bookingId, body.source);
    }
    async getFlights() {
        return this.adminService.getAllFlights();
    }
    async createFlight(req, body) {
        return this.adminService.createFlight(req.user.userId, body);
    }
    async updateFlight(flightId, body) {
        return this.adminService.updateFlight(flightId, body);
    }
    async deleteFlight(flightId) {
        return this.adminService.deleteFlight(flightId);
    }
    async toggleFlightStatus(flightId) {
        return this.adminService.toggleFlightStatus(flightId);
    }
    async getFlightSalesReport(flightId) {
        return this.adminService.getFlightSalesReport(flightId);
    }
    async getFlightCapacityReport(flightId) {
        return this.adminService.getFlightCapacityReport(flightId);
    }
    async getFlightAllotments(flightId) {
        return this.adminService.getFlightAllotments(flightId);
    }
    async createAllotment(flightId, data) {
        return this.adminService.createAllotment(flightId, data);
    }
    async deleteAllotment(flightId, allotmentId) {
        return this.adminService.deleteAllotment(flightId, allotmentId);
    }
    async getAllTickets(status) {
        return this.adminService.getAllTickets(status);
    }
    async updateTicketStatus(ticketId, body) {
        return this.adminService.updateTicketStatus(ticketId, body.status);
    }
    async adminReplyToTicket(req, ticketId, body) {
        return this.adminService.adminReplyToTicket(req.user.userId, ticketId, body.message, body.sendChannels);
    }
    async getBasicData(type) {
        return this.adminService.getBasicData(type);
    }
    async createBasicData(type, data) {
        return this.adminService.createBasicData(type, data);
    }
    async updateBasicData(type, id, data) {
        return this.adminService.updateBasicData(type, id, data);
    }
    async deleteBasicData(type, id) {
        return this.adminService.deleteBasicData(type, id);
    }
    async getCommissionModels() {
        return this.adminService.getCommissionModels();
    }
    async createCommissionModel(data) {
        return this.adminService.createCommissionModel(data);
    }
    async updateCommissionModel(id, data) {
        return this.adminService.updateCommissionModel(id, data);
    }
    async deleteCommissionModel(id) {
        return this.adminService.deleteCommissionModel(id);
    }
    async getRateLimits() {
        return this.adminService.getRateLimits();
    }
    async createRateLimit(data) {
        return this.adminService.createRateLimit(data);
    }
    async updateRateLimit(id, data) {
        return this.adminService.updateRateLimit(id, data);
    }
    async deleteRateLimit(id) {
        return this.adminService.deleteRateLimit(id);
    }
    async getRefundPolicies() {
        return this.adminService.getRefundPolicies();
    }
    async createRefundPolicy(data) {
        return this.adminService.createRefundPolicy(data);
    }
    async updateRefundPolicy(id, data) {
        return this.adminService.updateRefundPolicy(id, data);
    }
    async deleteRefundPolicy(id) {
        return this.adminService.deleteRefundPolicy(id);
    }
    async getActivityLogs(page = 1, limit = 50) {
        return this.adminService.getActivityLogs(page, limit);
    }
    async getTenants() {
        return this.adminService.getTenants();
    }
    async getCommissionStats(tenantId) {
        return this.adminService.getCommissionStats(tenantId);
    }
    async createTenant(data) {
        return this.adminService.createTenant(data);
    }
    async updateTenant(tenantId, data) {
        return this.adminService.updateTenant(tenantId, data);
    }
    async getPermissions() {
        return this.adminService.getPermissions();
    }
    async updatePermissions(permissions) {
        return this.adminService.updatePermissions(permissions);
    }
    async getAdvertisements() {
        return this.adminService.getAdvertisements();
    }
    async createAdvertisement(data) {
        return this.adminService.createAdvertisement(data);
    }
    async updateAdvertisement(id, data) {
        return this.adminService.updateAdvertisement(id, data);
    }
    async deleteAdvertisement(id) {
        return this.adminService.deleteAdvertisement(id);
    }
    async getContent() {
        return this.adminService.getContent();
    }
    async updateContent(content) {
        return this.adminService.updateContent(content);
    }
    async createManualBooking(data) {
        return this.adminService.createManualBooking(data);
    }
    async getRefunds(status) {
        return this.adminService.getRefunds(status);
    }
    async updateRefund(refundId, body) {
        return this.adminService.updateRefund(refundId, body.action, body.reason);
    }
    async getExpenses(startDate, endDate) {
        return this.adminService.getExpenses(startDate, endDate);
    }
    async createExpense(data) {
        return this.adminService.createExpense(data);
    }
    async getChartOfAccounts() {
        return this.adminService.getChartOfAccounts();
    }
    async createAccount(data) {
        return this.adminService.createAccount(data);
    }
    async updateAccount(accountId, data) {
        return this.adminService.updateAccount(accountId, data);
    }
    async getTelegramConfig() {
        return this.adminService.getTelegramConfig();
    }
    async updateTelegramConfig(config) {
        return this.adminService.updateTelegramConfig(config);
    }
    async getWhatsAppConfig() {
        return this.adminService.getWhatsAppConfig();
    }
    async updateWhatsAppConfig(config) {
        return this.adminService.updateWhatsAppConfig(config);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)('cancel-past-flights'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel all past flights' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "cancelPastFlights", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get dashboard statistics' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)('users'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new user (admin)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createUser", null);
__decorate([
    (0, common_1.Put)('users/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update user' }),
    (0, swagger_1.ApiBody)({ type: dto_1.UpdateUserDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Post)('users/:id/charge-wallet'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Charge user wallet' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "chargeUserWallet", null);
__decorate([
    (0, common_1.Post)('users/:id/reset-password'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Reset user password' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "resetUserPassword", null);
__decorate([
    (0, common_1.Get)('bookings'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all bookings' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getBookings", null);
__decorate([
    (0, common_1.Put)('bookings/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update booking' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateBooking", null);
__decorate([
    (0, common_1.Post)('bookings/fix-sources'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Fix booking sources' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "fixBookingSources", null);
__decorate([
    (0, common_1.Post)('bookings/force-update/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Force update specific booking source' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "forceUpdateBookingSource", null);
__decorate([
    (0, common_1.Get)('flights'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all flights' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getFlights", null);
__decorate([
    (0, common_1.Post)('flights'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new flight' }),
    (0, swagger_1.ApiBody)({ type: dto_1.CreateFlightDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CreateFlightDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createFlight", null);
__decorate([
    (0, common_1.Put)('flights/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update flight' }),
    (0, swagger_1.ApiBody)({ type: dto_1.UpdateFlightDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateFlightDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateFlight", null);
__decorate([
    (0, common_1.Delete)('flights/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete flight' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteFlight", null);
__decorate([
    (0, common_1.Put)('flights/:id/toggle-status'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle flight status (ON_TIME/CANCELLED)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "toggleFlightStatus", null);
__decorate([
    (0, common_1.Get)('flights/:id/sales-report'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get flight sales report' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getFlightSalesReport", null);
__decorate([
    (0, common_1.Get)('flights/:id/capacity-report'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get flight capacity report' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getFlightCapacityReport", null);
__decorate([
    (0, common_1.Get)('flights/:id/allotments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get flight seat allotments' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getFlightAllotments", null);
__decorate([
    (0, common_1.Post)('flights/:id/allotments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create seat allotment' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createAllotment", null);
__decorate([
    (0, common_1.Delete)('flights/:id/allotments/:allotmentId'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete seat allotment' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('allotmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteAllotment", null);
__decorate([
    (0, common_1.Get)('tickets'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all support tickets' }),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllTickets", null);
__decorate([
    (0, common_1.Put)('tickets/:id/status'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update ticket status' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateTicketStatus", null);
__decorate([
    (0, common_1.Post)('tickets/:id/admin-reply'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Admin reply to ticket with notification channels' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "adminReplyToTicket", null);
__decorate([
    (0, common_1.Get)('basic-data/:type'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get basic data by type' }),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getBasicData", null);
__decorate([
    (0, common_1.Post)('basic-data/:type'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create basic data item' }),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createBasicData", null);
__decorate([
    (0, common_1.Put)('basic-data/:type/:id'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update basic data item' }),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateBasicData", null);
__decorate([
    (0, common_1.Delete)('basic-data/:type/:id'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete basic data item' }),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteBasicData", null);
__decorate([
    (0, common_1.Get)('commission-models'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get commission models' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getCommissionModels", null);
__decorate([
    (0, common_1.Post)('commission-models'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create commission model' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createCommissionModel", null);
__decorate([
    (0, common_1.Put)('commission-models/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update commission model' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateCommissionModel", null);
__decorate([
    (0, common_1.Delete)('commission-models/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete commission model' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteCommissionModel", null);
__decorate([
    (0, common_1.Get)('rate-limits'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get rate limits' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getRateLimits", null);
__decorate([
    (0, common_1.Post)('rate-limits'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create rate limit' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createRateLimit", null);
__decorate([
    (0, common_1.Put)('rate-limits/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update rate limit' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateRateLimit", null);
__decorate([
    (0, common_1.Delete)('rate-limits/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete rate limit' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteRateLimit", null);
__decorate([
    (0, common_1.Get)('refund-policies'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get refund policies' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getRefundPolicies", null);
__decorate([
    (0, common_1.Post)('refund-policies'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create refund policy' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createRefundPolicy", null);
__decorate([
    (0, common_1.Put)('refund-policies/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update refund policy' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateRefundPolicy", null);
__decorate([
    (0, common_1.Delete)('refund-policies/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete refund policy' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteRefundPolicy", null);
__decorate([
    (0, common_1.Get)('activity-logs'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get activity logs' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getActivityLogs", null);
__decorate([
    (0, common_1.Get)('tenants'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all tenants' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getTenants", null);
__decorate([
    (0, common_1.Get)('tenants/commission/stats/:tenantId'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get commission statistics for a tenant' }),
    __param(0, (0, common_1.Param)('tenantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getCommissionStats", null);
__decorate([
    (0, common_1.Post)('tenants'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new tenant' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createTenant", null);
__decorate([
    (0, common_1.Put)('tenants/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update tenant' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateTenant", null);
__decorate([
    (0, common_1.Get)('permissions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get role permissions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPermissions", null);
__decorate([
    (0, common_1.Put)('permissions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update role permissions' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updatePermissions", null);
__decorate([
    (0, common_1.Get)('advertisements'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get advertisements' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAdvertisements", null);
__decorate([
    (0, common_1.Post)('advertisements'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create advertisement' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createAdvertisement", null);
__decorate([
    (0, common_1.Put)('advertisements/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update advertisement' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateAdvertisement", null);
__decorate([
    (0, common_1.Delete)('advertisements/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete advertisement' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteAdvertisement", null);
__decorate([
    (0, common_1.Get)('content'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get site content' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getContent", null);
__decorate([
    (0, common_1.Put)('content'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update site content' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateContent", null);
__decorate([
    (0, common_1.Post)('manual-booking'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create manual booking' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createManualBooking", null);
__decorate([
    (0, common_1.Get)('refunds'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all refunds (admin)' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getRefunds", null);
__decorate([
    (0, common_1.Put)('refunds/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update refund status (admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateRefund", null);
__decorate([
    (0, common_1.Get)('accounting/expenses'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get expenses (admin)' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false }),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getExpenses", null);
__decorate([
    (0, common_1.Post)('accounting/expenses'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create expense (admin)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createExpense", null);
__decorate([
    (0, common_1.Get)('accounting/chart-of-accounts'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get chart of accounts (admin)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getChartOfAccounts", null);
__decorate([
    (0, common_1.Post)('accounting/chart-of-accounts'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create account (admin)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createAccount", null);
__decorate([
    (0, common_1.Put)('accounting/chart-of-accounts/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update account (admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateAccount", null);
__decorate([
    (0, common_1.Get)('integrations/telegram'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get Telegram configuration (admin)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getTelegramConfig", null);
__decorate([
    (0, common_1.Put)('integrations/telegram'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update Telegram configuration (admin)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateTelegramConfig", null);
__decorate([
    (0, common_1.Get)('integrations/whatsapp'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get WhatsApp configuration (admin)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getWhatsAppConfig", null);
__decorate([
    (0, common_1.Put)('integrations/whatsapp'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update WhatsApp configuration (admin)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateWhatsAppConfig", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)({ path: 'admin', version: '1' }),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map