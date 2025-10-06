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
exports.FinancialReportsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const financial_reports_service_1 = require("./financial-reports.service");
let FinancialReportsController = class FinancialReportsController {
    constructor(financialReportsService) {
        this.financialReportsService = financialReportsService;
    }
    async getUserFinancialSummary(req) {
        return this.financialReportsService.getUserFinancialSummary(req.user.sub);
    }
    async getProfitLossReport(startDate, endDate) {
        const start = startDate ? new Date(startDate) : undefined;
        const end = endDate ? new Date(endDate) : undefined;
        return this.financialReportsService.getProfitLossReport(start, end);
    }
    async getUserTravelExpenses(req, startDate, endDate) {
        const start = startDate ? new Date(startDate) : undefined;
        const end = endDate ? new Date(endDate) : undefined;
        return this.financialReportsService.getUserTravelExpenses(req.user.sub, start, end);
    }
    async generateInvoice(bookingId, req) {
        return this.financialReportsService.generateInvoice(bookingId, req.user.sub);
    }
};
exports.FinancialReportsController = FinancialReportsController;
__decorate([
    (0, common_1.Get)('user-summary'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FinancialReportsController.prototype, "getUserFinancialSummary", null);
__decorate([
    (0, common_1.Get)('profit-loss'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FinancialReportsController.prototype, "getProfitLossReport", null);
__decorate([
    (0, common_1.Get)('travel-expenses'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], FinancialReportsController.prototype, "getUserTravelExpenses", null);
__decorate([
    (0, common_1.Get)('invoice/:bookingId'),
    __param(0, (0, common_1.Param)('bookingId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FinancialReportsController.prototype, "generateInvoice", null);
exports.FinancialReportsController = FinancialReportsController = __decorate([
    (0, common_1.Controller)('financial-reports'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [financial_reports_service_1.FinancialReportsService])
], FinancialReportsController);
//# sourceMappingURL=financial-reports.controller.js.map