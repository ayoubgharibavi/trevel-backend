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
exports.TenantSeederService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TenantSeederService = class TenantSeederService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        await this.seedMainTenant();
    }
    async seedMainTenant() {
        try {
            const existingTenant = await this.prisma.tenant.findFirst({
                where: { slug: 'main' }
            });
            if (!existingTenant) {
                const mainTenant = await this.prisma.tenant.create({
                    data: {
                        name: 'Trevel Main',
                        slug: 'main',
                        contactEmail: 'admin@trevel.com',
                        contactPhone: '+98-912-1234567',
                        isActive: true,
                        isWhiteLabel: false,
                        commissionRate: 0,
                        parentCommissionRate: 0,
                        domain: 'trevel.com',
                        primaryColor: '#3B82F6',
                        theme: 'default',
                        footerText: 'Powered by Trevel',
                        supportEmail: 'support@trevel.com',
                        supportPhone: '+98-912-1234567'
                    }
                });
                console.log('✅ Main tenant created:', mainTenant.id);
                await this.prisma.user.updateMany({
                    where: { tenantId: { equals: null } },
                    data: { tenantId: mainTenant.id }
                });
                await this.prisma.booking.updateMany({
                    where: { tenantId: { equals: null } },
                    data: { tenantId: mainTenant.id }
                });
                console.log('✅ Existing users and bookings assigned to main tenant');
            }
            else {
                console.log('✅ Main tenant already exists');
            }
        }
        catch (error) {
            console.error('❌ Error seeding main tenant:', error);
        }
    }
};
exports.TenantSeederService = TenantSeederService;
exports.TenantSeederService = TenantSeederService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TenantSeederService);
//# sourceMappingURL=tenant-seeder.service.js.map