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
exports.AccountingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const accounting_service_1 = require("./accounting.service");
class CreateAccountDto {
}
class CreateExpenseDto {
}
class CreateJournalEntryDto {
}
let AccountingController = class AccountingController {
    constructor(accountingService) {
        this.accountingService = accountingService;
    }
    async getOverview() {
        return this.accountingService.getOverview();
    }
    async getChartOfAccounts() {
        return this.accountingService.getChartOfAccounts();
    }
    async createAccount(data) {
        return this.accountingService.createAccount(data);
    }
    async updateAccount(accountId, data) {
        return this.accountingService.updateAccount(accountId, data);
    }
    async getJournalEntries(startDate, endDate) {
        return this.accountingService.getJournalEntries(startDate, endDate);
    }
    async createJournalEntry(data) {
        return this.accountingService.createJournalEntry(data);
    }
    async getExpenses(startDate, endDate) {
        return this.accountingService.getExpenses(startDate, endDate);
    }
    async createExpense(data) {
        return this.accountingService.createExpense(data);
    }
    async getProfitLossReport(startDate, endDate) {
        return this.accountingService.getProfitLossReport(startDate, endDate);
    }
    async getBalanceSheetReport(asOfDate) {
        return this.accountingService.getBalanceSheetReport(asOfDate);
    }
    async getTrialBalanceReport(asOfDate) {
        return this.accountingService.getTrialBalanceReport(asOfDate);
    }
    async getAccountLedger(accountId, startDate, endDate) {
        return this.accountingService.getAccountLedger(accountId, startDate, endDate);
    }
};
exports.AccountingController = AccountingController;
__decorate([
    (0, common_1.Get)('overview'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get accounting overview' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "getOverview", null);
__decorate([
    (0, common_1.Get)('chart-of-accounts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get chart of accounts' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "getChartOfAccounts", null);
__decorate([
    (0, common_1.Post)('chart-of-accounts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new account' }),
    (0, swagger_1.ApiBody)({ type: CreateAccountDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateAccountDto]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "createAccount", null);
__decorate([
    (0, common_1.Put)('chart-of-accounts/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update account' }),
    (0, swagger_1.ApiBody)({ type: CreateAccountDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreateAccountDto]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "updateAccount", null);
__decorate([
    (0, common_1.Get)('journal-entries'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get journal entries' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false }),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "getJournalEntries", null);
__decorate([
    (0, common_1.Post)('journal-entries'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create journal entry' }),
    (0, swagger_1.ApiBody)({ type: CreateJournalEntryDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateJournalEntryDto]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "createJournalEntry", null);
__decorate([
    (0, common_1.Get)('expenses'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get expenses' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false }),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "getExpenses", null);
__decorate([
    (0, common_1.Post)('expenses'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create expense' }),
    (0, swagger_1.ApiBody)({ type: CreateExpenseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateExpenseDto]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "createExpense", null);
__decorate([
    (0, common_1.Get)('reports/profit-loss'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get profit & loss report' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: true }),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "getProfitLossReport", null);
__decorate([
    (0, common_1.Get)('reports/balance-sheet'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get balance sheet report' }),
    (0, swagger_1.ApiQuery)({ name: 'asOfDate', required: true }),
    __param(0, (0, common_1.Query)('asOfDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "getBalanceSheetReport", null);
__decorate([
    (0, common_1.Get)('reports/trial-balance'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get trial balance report' }),
    (0, swagger_1.ApiQuery)({ name: 'asOfDate', required: true }),
    __param(0, (0, common_1.Query)('asOfDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "getTrialBalanceReport", null);
__decorate([
    (0, common_1.Get)('ledger/:accountId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get account ledger' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false }),
    __param(0, (0, common_1.Param)('accountId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "getAccountLedger", null);
exports.AccountingController = AccountingController = __decorate([
    (0, swagger_1.ApiTags)('accounting'),
    (0, common_1.Controller)({ path: 'accounting', version: '1' }),
    __metadata("design:paramtypes", [accounting_service_1.AccountingService])
], AccountingController);
//# sourceMappingURL=accounting.controller.js.map