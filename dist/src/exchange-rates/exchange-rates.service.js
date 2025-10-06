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
exports.ExchangeRatesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ExchangeRatesService = class ExchangeRatesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllExchangeRates() {
        return this.prisma.exchangeRate.findMany({
            include: {
                baseCurrency: true,
                targetCurrency: true,
            },
            orderBy: {
                lastUpdated: 'desc',
            },
        });
    }
    async getExchangeRate(id) {
        const exchangeRate = await this.prisma.exchangeRate.findUnique({
            where: { id },
            include: {
                baseCurrency: true,
                targetCurrency: true,
            },
        });
        if (!exchangeRate) {
            throw new common_1.NotFoundException('نرخ تبدیل ارز یافت نشد');
        }
        return exchangeRate;
    }
    async getExchangeRateByCurrencies(baseCurrencyId, targetCurrencyId) {
        const exchangeRate = await this.prisma.exchangeRate.findUnique({
            where: {
                baseCurrencyId_targetCurrencyId: {
                    baseCurrencyId,
                    targetCurrencyId,
                },
            },
            include: {
                baseCurrency: true,
                targetCurrency: true,
            },
        });
        if (!exchangeRate) {
            throw new common_1.NotFoundException('نرخ تبدیل ارز یافت نشد');
        }
        return exchangeRate;
    }
    async createExchangeRate(createExchangeRateDto) {
        const baseCurrency = await this.prisma.currency.findUnique({
            where: { id: createExchangeRateDto.baseCurrencyId },
        });
        const targetCurrency = await this.prisma.currency.findUnique({
            where: { id: createExchangeRateDto.targetCurrencyId },
        });
        if (!baseCurrency || !targetCurrency) {
            throw new common_1.BadRequestException('ارز مبدأ یا مقصد یافت نشد');
        }
        const existingRate = await this.prisma.exchangeRate.findUnique({
            where: {
                baseCurrencyId_targetCurrencyId: {
                    baseCurrencyId: createExchangeRateDto.baseCurrencyId,
                    targetCurrencyId: createExchangeRateDto.targetCurrencyId,
                },
            },
        });
        if (existingRate) {
            throw new common_1.BadRequestException('نرخ تبدیل ارز برای این جفت ارز قبلاً وجود دارد');
        }
        return this.prisma.exchangeRate.create({
            data: {
                baseCurrencyId: createExchangeRateDto.baseCurrencyId,
                targetCurrencyId: createExchangeRateDto.targetCurrencyId,
                rate: createExchangeRateDto.rate,
                source: createExchangeRateDto.source || 'MANUAL',
                lastUpdated: new Date(),
            },
            include: {
                baseCurrency: true,
                targetCurrency: true,
            },
        });
    }
    async updateExchangeRate(id, updateExchangeRateDto) {
        const exchangeRate = await this.prisma.exchangeRate.findUnique({
            where: { id },
        });
        if (!exchangeRate) {
            throw new common_1.NotFoundException('نرخ تبدیل ارز یافت نشد');
        }
        return this.prisma.exchangeRate.update({
            where: { id },
            data: {
                rate: updateExchangeRateDto.rate,
                source: updateExchangeRateDto.source,
                lastUpdated: new Date(),
            },
            include: {
                baseCurrency: true,
                targetCurrency: true,
            },
        });
    }
    async deleteExchangeRate(id) {
        const exchangeRate = await this.prisma.exchangeRate.findUnique({
            where: { id },
        });
        if (!exchangeRate) {
            throw new common_1.NotFoundException('نرخ تبدیل ارز یافت نشد');
        }
        return this.prisma.exchangeRate.delete({
            where: { id },
        });
    }
    async getAllCurrencies() {
        return this.prisma.currency.findMany({
            where: { isActive: true },
            orderBy: { code: 'asc' },
        });
    }
    async convertCurrency(amount, fromCurrencyId, toCurrencyId) {
        if (fromCurrencyId === toCurrencyId) {
            return amount;
        }
        const exchangeRate = await this.prisma.exchangeRate.findUnique({
            where: {
                baseCurrencyId_targetCurrencyId: {
                    baseCurrencyId: fromCurrencyId,
                    targetCurrencyId: toCurrencyId,
                },
            },
        });
        if (!exchangeRate) {
            const reverseRate = await this.prisma.exchangeRate.findUnique({
                where: {
                    baseCurrencyId_targetCurrencyId: {
                        baseCurrencyId: toCurrencyId,
                        targetCurrencyId: fromCurrencyId,
                    },
                },
            });
            if (reverseRate) {
                return amount / reverseRate.rate;
            }
            throw new common_1.NotFoundException('نرخ تبدیل ارز برای این جفت ارز یافت نشد');
        }
        return amount * exchangeRate.rate;
    }
};
exports.ExchangeRatesService = ExchangeRatesService;
exports.ExchangeRatesService = ExchangeRatesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExchangeRatesService);
//# sourceMappingURL=exchange-rates.service.js.map