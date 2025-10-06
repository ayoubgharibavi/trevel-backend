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
exports.CommissionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const pricing_service_1 = require("./pricing.service");
let CommissionService = class CommissionService {
    constructor(prisma, pricingService) {
        this.prisma = prisma;
        this.pricingService = pricingService;
    }
    async createCommissionTransaction(createDto) {
        const { tenantId, bookingId, totalAmount, agentCommission, parentCommission, netAmount } = createDto;
        const tenant = await this.prisma.tenant.findUnique({
            where: { id: tenantId },
            include: { parentTenant: true }
        });
        if (!tenant) {
            throw new common_1.NotFoundException('Tenant not found');
        }
        if (agentCommission !== undefined && parentCommission !== undefined) {
            const agentAmount = Math.floor(agentCommission);
            const parentAmount = Math.floor(parentCommission);
            return this.prisma.commissionTransaction.create({
                data: {
                    tenantId,
                    bookingId,
                    agentCommission: agentCommission,
                    parentCommission: parentCommission,
                    totalAmount: BigInt(totalAmount),
                    agentAmount: BigInt(agentAmount),
                    parentAmount: BigInt(parentAmount),
                    status: 'PENDING'
                }
            });
        }
        const agentCommissionRate = tenant.commissionRate || 5.0;
        const parentCommissionRate = tenant.parentCommissionRate || 2.0;
        let agentAmount;
        let parentAmount;
        if (tenant.commissionType === 'FIXED' && tenant.commissionAmount) {
            agentAmount = Number(tenant.commissionAmount);
        }
        else {
            agentAmount = Math.floor((totalAmount * agentCommissionRate) / 100);
        }
        if (tenant.parentCommissionType === 'FIXED' && tenant.parentCommissionAmount) {
            parentAmount = Number(tenant.parentCommissionAmount);
        }
        else {
            parentAmount = Math.floor((totalAmount * parentCommissionRate) / 100);
        }
        return this.prisma.commissionTransaction.create({
            data: {
                tenantId,
                bookingId,
                agentCommission: agentCommissionRate,
                parentCommission: parentCommissionRate,
                totalAmount: BigInt(totalAmount),
                agentAmount: BigInt(agentAmount),
                parentAmount: BigInt(parentAmount),
                status: 'PENDING'
            }
        });
    }
    async getTenantCommissions(tenantId) {
        return this.prisma.commissionTransaction.findMany({
            where: { tenantId },
            include: {
                booking: {
                    include: {
                        flight: true,
                        user: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }
    async getParentCommissions(parentTenantId) {
        const subTenants = await this.prisma.tenant.findMany({
            where: { parentTenantId },
            select: { id: true }
        });
        const subTenantIds = subTenants.map(t => t.id);
        return this.prisma.commissionTransaction.findMany({
            where: {
                tenantId: { in: subTenantIds }
            },
            include: {
                tenant: true,
                booking: {
                    include: {
                        flight: true,
                        user: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }
    async updateCommissionStatus(id, status) {
        return this.prisma.commissionTransaction.update({
            where: { id },
            data: {
                status,
                paidAt: status === 'PAID' ? new Date() : null
            }
        });
    }
    async getCommissionStats(tenantId) {
        const stats = await this.prisma.commissionTransaction.aggregate({
            where: { tenantId },
            _sum: {
                agentAmount: true,
                parentAmount: true,
                totalAmount: true
            },
            _count: {
                id: true
            }
        });
        const pendingStats = await this.prisma.commissionTransaction.aggregate({
            where: {
                tenantId,
                status: 'PENDING'
            },
            _sum: {
                agentAmount: true
            },
            _count: {
                id: true
            }
        });
        const paidStats = await this.prisma.commissionTransaction.aggregate({
            where: {
                tenantId,
                status: 'PAID'
            },
            _sum: {
                agentAmount: true
            },
            _count: {
                id: true
            }
        });
        return {
            totalCommissions: stats._sum.agentAmount || BigInt(0),
            totalPaid: paidStats._sum.agentAmount || BigInt(0),
            totalPending: pendingStats._sum.agentAmount || BigInt(0),
            totalTransactions: stats._count.id,
            pendingTransactions: pendingStats._count.id,
            paidTransactions: paidStats._count.id
        };
    }
    async processBookingCommission(bookingId) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: { tenant: true }
        });
        if (!booking || !booking.totalPrice) {
            throw new common_1.NotFoundException('Booking not found or has no price');
        }
        let source = 'manual';
        if (booking.source === 'sepehr') {
            source = 'sepehr';
        }
        else if (booking.source === 'charter118') {
            source = 'charter118';
        }
        const commissionCalculation = await this.pricingService.calculateCommissionForBooking(booking.tenantId, booking.totalPrice, source);
        return this.createCommissionTransaction({
            tenantId: booking.tenantId,
            bookingId: booking.id,
            totalAmount: booking.totalPrice,
            agentCommission: commissionCalculation.agentCommission,
            parentCommission: commissionCalculation.parentCommission,
            netAmount: commissionCalculation.netAmount
        });
    }
};
exports.CommissionService = CommissionService;
exports.CommissionService = CommissionService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => pricing_service_1.PricingService))),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pricing_service_1.PricingService])
], CommissionService);
//# sourceMappingURL=commission.service.js.map