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
exports.ExchangeRatesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const exchange_rates_service_1 = require("./exchange-rates.service");
const dto_1 = require("../common/dto");
const public_decorator_1 = require("../auth/decorators/public.decorator");
let ExchangeRatesController = class ExchangeRatesController {
    constructor(exchangeRatesService) {
        this.exchangeRatesService = exchangeRatesService;
    }
    async getAllExchangeRates() {
        const rates = await this.exchangeRatesService.getAllExchangeRates();
        return rates.map(rate => ({
            ...rate,
            lastUpdated: rate.lastUpdated ? new Date(rate.lastUpdated).toISOString() : null,
        }));
    }
    async getAllCurrencies() {
        return this.exchangeRatesService.getAllCurrencies();
    }
    async convertCurrency(amount, fromCurrencyId, toCurrencyId) {
        const convertedAmount = await this.exchangeRatesService.convertCurrency(parseFloat(amount), fromCurrencyId, toCurrencyId);
        return { convertedAmount };
    }
    async getExchangeRate(id) {
        return this.exchangeRatesService.getExchangeRate(id);
    }
    async createExchangeRate(createExchangeRateDto) {
        return this.exchangeRatesService.createExchangeRate(createExchangeRateDto);
    }
    async updateExchangeRate(id, updateExchangeRateDto) {
        return this.exchangeRatesService.updateExchangeRate(id, updateExchangeRateDto);
    }
    async deleteExchangeRate(id) {
        return this.exchangeRatesService.deleteExchangeRate(id);
    }
};
exports.ExchangeRatesController = ExchangeRatesController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت تمام نرخ‌های تبدیل ارز' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'لیست نرخ‌های تبدیل ارز' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExchangeRatesController.prototype, "getAllExchangeRates", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('currencies'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت تمام ارزها' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'لیست ارزها' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExchangeRatesController.prototype, "getAllCurrencies", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('convert'),
    (0, swagger_1.ApiOperation)({ summary: 'تبدیل ارز' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'مقدار تبدیل شده' }),
    __param(0, (0, common_1.Query)('amount')),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ExchangeRatesController.prototype, "convertCurrency", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'دریافت نرخ تبدیل ارز با شناسه' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'نرخ تبدیل ارز' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'نرخ تبدیل ارز یافت نشد' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExchangeRatesController.prototype, "getExchangeRate", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'ایجاد نرخ تبدیل ارز جدید' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'نرخ تبدیل ارز ایجاد شد' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'داده‌های نامعتبر' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateExchangeRateDto]),
    __metadata("design:returntype", Promise)
], ExchangeRatesController.prototype, "createExchangeRate", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'به‌روزرسانی نرخ تبدیل ارز' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'نرخ تبدیل ارز به‌روزرسانی شد' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'نرخ تبدیل ارز یافت نشد' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateExchangeRateDto]),
    __metadata("design:returntype", Promise)
], ExchangeRatesController.prototype, "updateExchangeRate", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'حذف نرخ تبدیل ارز' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'نرخ تبدیل ارز حذف شد' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'نرخ تبدیل ارز یافت نشد' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExchangeRatesController.prototype, "deleteExchangeRate", null);
exports.ExchangeRatesController = ExchangeRatesController = __decorate([
    (0, swagger_1.ApiTags)('exchange-rates'),
    (0, common_1.Controller)({ path: 'exchange-rates', version: '1' }),
    __metadata("design:paramtypes", [exchange_rates_service_1.ExchangeRatesService])
], ExchangeRatesController);
//# sourceMappingURL=exchange-rates.controller.js.map