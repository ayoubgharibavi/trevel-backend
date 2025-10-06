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
exports.TenantsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TenantsService = class TenantsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTenant(createTenantDto) {
        const { name, slug, contactEmail, contactPhone, parentTenantId, ...otherFields } = createTenantDto;
        const existingTenant = await this.prisma.tenant.findUnique({
            where: { slug }
        });
        if (existingTenant) {
            throw new common_1.BadRequestException('Tenant slug already exists');
        }
        if (parentTenantId) {
            const parentTenant = await this.prisma.tenant.findUnique({
                where: { id: parentTenantId }
            });
            if (!parentTenant) {
                throw new common_1.NotFoundException('Parent tenant not found');
            }
        }
        return this.prisma.tenant.create({
            data: {
                name,
                slug,
                contactEmail,
                contactPhone,
                parentTenantId,
                ...otherFields
            }
        });
    }
    async findAllTenants() {
        return this.prisma.tenant.findMany({
            include: {
                parentTenant: true,
                subTenants: true,
                users: true,
                bookings: true,
                _count: {
                    select: {
                        users: true,
                        bookings: true,
                        subTenants: true
                    }
                }
            }
        });
    }
    async findTenantById(id) {
        const tenant = await this.prisma.tenant.findUnique({
            where: { id },
            include: {
                parentTenant: true,
                subTenants: true,
                users: true,
                bookings: true,
                commissionTransactions: true
            }
        });
        if (!tenant) {
            throw new common_1.NotFoundException('Tenant not found');
        }
        return tenant;
    }
    async findTenantBySlug(slug) {
        const tenant = await this.prisma.tenant.findUnique({
            where: { slug },
            include: {
                parentTenant: true,
                subTenants: true
            }
        });
        if (!tenant) {
            throw new common_1.NotFoundException('Tenant not found');
        }
        return tenant;
    }
    async findTenantByDomain(domain) {
        const tenant = await this.prisma.tenant.findFirst({
            where: {
                OR: [
                    { domain: domain },
                    { subdomain: domain },
                    { customDomain: domain }
                ]
            },
            include: {
                parentTenant: true,
                subTenants: true
            }
        });
        if (!tenant) {
            throw new common_1.NotFoundException('Tenant not found for domain');
        }
        return tenant;
    }
    async updateTenant(id, updateTenantDto) {
        const tenant = await this.findTenantById(id);
        return this.prisma.tenant.update({
            where: { id },
            data: updateTenantDto
        });
    }
    async deleteTenant(id) {
        const tenant = await this.findTenantById(id);
        if (tenant.subTenants && tenant.subTenants.length > 0) {
            throw new common_1.BadRequestException('Cannot delete tenant with sub-tenants');
        }
        await this.prisma.tenant.delete({
            where: { id }
        });
    }
    async getSubTenants(parentTenantId) {
        return this.prisma.tenant.findMany({
            where: { parentTenantId },
            include: {
                users: true,
                bookings: true,
                _count: {
                    select: {
                        users: true,
                        bookings: true
                    }
                }
            }
        });
    }
    async getTenantStats(tenantId) {
        const tenant = await this.findTenantById(tenantId);
        const stats = await this.prisma.booking.aggregate({
            where: { tenantId },
            _sum: {
                totalPrice: true
            },
            _count: {
                id: true
            }
        });
        const commissionStats = await this.prisma.commissionTransaction.aggregate({
            where: { tenantId },
            _sum: {
                agentAmount: true,
                parentAmount: true
            },
            _count: {
                id: true
            }
        });
        return {
            tenant,
            totalBookings: stats._count.id,
            totalRevenue: stats._sum.totalPrice || 0,
            totalCommissionEarned: commissionStats._sum.agentAmount || 0,
            totalCommissionPaid: commissionStats._sum.parentAmount || 0,
            commissionTransactions: commissionStats._count.id
        };
    }
    async activateTenant(id) {
        return this.prisma.tenant.update({
            where: { id },
            data: { isActive: true }
        });
    }
    async deactivateTenant(id) {
        return this.prisma.tenant.update({
            where: { id },
            data: { isActive: false }
        });
    }
};
exports.TenantsService = TenantsService;
exports.TenantsService = TenantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TenantsService);
//# sourceMappingURL=tenants.service.js.map