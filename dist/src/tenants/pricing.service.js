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
exports.PricingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PricingService = class PricingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async calculateFinalPrice(tenantId, basePrice, source) {
        const tenant = await this.prisma.tenant.findUnique({
            where: { id: tenantId },
            select: {
                commissionRate: true,
                parentCommissionRate: true,
                pricingType: true,
            },
        });
        if (!tenant) {
            throw new Error('Tenant not found');
        }
        const { commissionRate, parentCommissionRate, pricingType } = tenant;
        const effectivePricingType = this.getEffectivePricingType(pricingType, source);
        let netPrice;
        let grossPrice;
        let commissionAmount;
        let parentCommissionAmount;
        let finalPrice;
        if (effectivePricingType === 'NET') {
            netPrice = basePrice;
            commissionAmount = (basePrice * commissionRate) / 100;
            parentCommissionAmount = (basePrice * parentCommissionRate) / 100;
            grossPrice = basePrice + commissionAmount + parentCommissionAmount;
            finalPrice = grossPrice;
        }
        else {
            grossPrice = basePrice;
            commissionAmount = (basePrice * commissionRate) / 100;
            parentCommissionAmount = (basePrice * parentCommissionRate) / 100;
            netPrice = basePrice - commissionAmount - parentCommissionAmount;
            finalPrice = basePrice;
        }
        return {
            netPrice: Math.round(netPrice),
            grossPrice: Math.round(grossPrice),
            commissionAmount: Math.round(commissionAmount),
            parentCommissionAmount: Math.round(parentCommissionAmount),
            finalPrice: Math.round(finalPrice),
        };
    }
    getEffectivePricingType(tenantPricingType, source) {
        if (tenantPricingType === 'NET') {
            return 'NET';
        }
        if (tenantPricingType === 'GROSS') {
            if (source === 'sepehr') {
                return 'GROSS';
            }
            if (source === 'charter118') {
                return 'NET';
            }
            if (source === 'manual') {
                return 'GROSS';
            }
        }
        return 'GROSS';
    }
    async calculateCommissionForBooking(tenantId, bookingPrice, source) {
        const tenant = await this.prisma.tenant.findUnique({
            where: { id: tenantId },
            select: {
                commissionRate: true,
                commissionAmount: true,
                commissionType: true,
                parentCommissionRate: true,
                parentCommissionAmount: true,
                parentCommissionType: true,
                pricingType: true,
            },
        });
        if (!tenant) {
            throw new Error('Tenant not found');
        }
        const { commissionRate, commissionAmount, commissionType, parentCommissionRate, parentCommissionAmount, parentCommissionType, pricingType } = tenant;
        const effectivePricingType = this.getEffectivePricingType(pricingType, source);
        let agentCommission;
        let parentCommission;
        let netAmount;
        if (commissionType === 'FIXED' && commissionAmount) {
            agentCommission = Number(commissionAmount);
        }
        else {
            agentCommission = (bookingPrice * (commissionRate || 5.0)) / 100;
        }
        if (parentCommissionType === 'FIXED' && parentCommissionAmount) {
            parentCommission = Number(parentCommissionAmount);
        }
        else {
            parentCommission = (bookingPrice * (parentCommissionRate || 2.0)) / 100;
        }
        if (effectivePricingType === 'NET') {
            netAmount = bookingPrice;
        }
        else {
            netAmount = bookingPrice - agentCommission - parentCommission;
        }
        return {
            agentCommission: Math.round(agentCommission),
            parentCommission: Math.round(parentCommission),
            netAmount: Math.round(netAmount),
        };
    }
};
exports.PricingService = PricingService;
exports.PricingService = PricingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PricingService);
//# sourceMappingURL=pricing.service.js.map