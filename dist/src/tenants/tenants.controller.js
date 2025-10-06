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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantsController = void 0;
const common_1 = require("@nestjs/common");
const tenants_service_1 = require("./tenants.service");
const commission_service_1 = require("./commission.service");
const domain_routing_service_1 = require("./domain-routing.service");
const create_tenant_dto_1 = require("./dto/create-tenant.dto");
const update_tenant_dto_1 = require("./dto/update-tenant.dto");
const create_commission_transaction_dto_1 = require("./dto/create-commission-transaction.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
let TenantsController = class TenantsController {
    constructor(tenantsService, commissionService, domainRoutingService) {
        this.tenantsService = tenantsService;
        this.commissionService = commissionService;
        this.domainRoutingService = domainRoutingService;
    }
    create(createTenantDto) {
        return this.tenantsService.createTenant(createTenantDto);
    }
    findAll() {
        return this.tenantsService.findAllTenants();
    }
    getSubTenants(parentId) {
        return this.tenantsService.getSubTenants(parentId);
    }
    getTenantStats(id) {
        return this.tenantsService.getTenantStats(id);
    }
    getTenantBySlug(slug) {
        return this.tenantsService.findTenantBySlug(slug);
    }
    getTenantByDomain(domain) {
        return this.domainRoutingService.findTenantByDomain(domain);
    }
    validateDomain(domain, excludeId) {
        return this.domainRoutingService.validateDomain(domain, excludeId);
    }
    getTenantBranding(id) {
        return this.domainRoutingService.getTenantBranding(id);
    }
    findOne(id) {
        return this.tenantsService.findTenantById(id);
    }
    update(id, updateTenantDto) {
        return this.tenantsService.updateTenant(id, updateTenantDto);
    }
    activate(id) {
        return this.tenantsService.activateTenant(id);
    }
    deactivate(id) {
        return this.tenantsService.deactivateTenant(id);
    }
    remove(id) {
        return this.tenantsService.deleteTenant(id);
    }
    createCommission(createDto) {
        return this.commissionService.createCommissionTransaction(createDto);
    }
    getTenantCommissions(tenantId) {
        return this.commissionService.getTenantCommissions(tenantId);
    }
    getParentCommissions(parentTenantId) {
        return this.commissionService.getParentCommissions(parentTenantId);
    }
    getCommissionStats(tenantId) {
        return this.commissionService.getCommissionStats(tenantId);
    }
    updateCommissionStatus(id, status) {
        return this.commissionService.updateCommissionStatus(id, status);
    }
    processBookingCommission(bookingId) {
        return this.commissionService.processBookingCommission(bookingId);
    }
};
exports.TenantsController = TenantsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tenant_dto_1.CreateTenantDto]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('sub-tenants/:parentId'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('parentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "getSubTenants", null);
__decorate([
    (0, common_1.Get)('stats/:id'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "getTenantStats", null);
__decorate([
    (0, common_1.Get)('by-slug/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "getTenantBySlug", null);
__decorate([
    (0, common_1.Get)('by-domain/:domain'),
    __param(0, (0, common_1.Param)('domain')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "getTenantByDomain", null);
__decorate([
    (0, common_1.Get)('validate-domain/:domain'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('domain')),
    __param(1, (0, common_1.Query)('excludeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "validateDomain", null);
__decorate([
    (0, common_1.Get)('branding/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "getTenantBranding", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tenant_dto_1.UpdateTenantDto]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/activate'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "activate", null);
__decorate([
    (0, common_1.Put)(':id/deactivate'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('commission'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_commission_transaction_dto_1.CreateCommissionTransactionDto]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "createCommission", null);
__decorate([
    (0, common_1.Get)('commission/:tenantId'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('tenantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "getTenantCommissions", null);
__decorate([
    (0, common_1.Get)('commission/parent/:parentTenantId'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('parentTenantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "getParentCommissions", null);
__decorate([
    (0, common_1.Get)('commission/stats/:tenantId'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('tenantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "getCommissionStats", null);
__decorate([
    (0, common_1.Put)('commission/:id/status'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "updateCommissionStatus", null);
__decorate([
    (0, common_1.Post)('commission/process-booking/:bookingId'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('bookingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "processBookingCommission", null);
exports.TenantsController = TenantsController = __decorate([
    (0, common_1.Controller)('tenants'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [tenants_service_1.TenantsService,
        commission_service_1.CommissionService, typeof (_a = typeof domain_routing_service_1.DomainRoutingService !== "undefined" && domain_routing_service_1.DomainRoutingService) === "function" ? _a : Object])
], TenantsController);
//# sourceMappingURL=tenants.controller.js.map