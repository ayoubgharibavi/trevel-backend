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
exports.ApiManagementController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_management_service_1 = require("./api-management.service");
let ApiManagementController = class ApiManagementController {
    constructor(apiManagementService) {
        this.apiManagementService = apiManagementService;
    }
    async getAllApis() {
        return this.apiManagementService.getAllApis();
    }
    async createApi(createApiDto) {
        return this.apiManagementService.createApi(createApiDto);
    }
    async updateApi(id, updateApiDto) {
        return this.apiManagementService.updateApi(id, updateApiDto);
    }
    async toggleApiStatus(id) {
        return this.apiManagementService.toggleApiStatus(id);
    }
    async toggleApiEnabled(id) {
        return this.apiManagementService.toggleApiEnabled(id);
    }
    async testApiConnection(id) {
        return this.apiManagementService.testApiConnection(id);
    }
    async getApiBalance(id) {
        return this.apiManagementService.getApiBalance(id);
    }
    async updateAllStatuses() {
        return this.apiManagementService.updateAllStatuses();
    }
    async updateAllBalances() {
        return this.apiManagementService.updateAllBalances();
    }
};
exports.ApiManagementController = ApiManagementController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all API management configurations' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiManagementController.prototype, "getAllApis", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new API management configuration' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApiManagementController.prototype, "createApi", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update API management configuration' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ApiManagementController.prototype, "updateApi", null);
__decorate([
    (0, common_1.Put)(':id/toggle-status'),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle API active status' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApiManagementController.prototype, "toggleApiStatus", null);
__decorate([
    (0, common_1.Put)(':id/toggle-enabled'),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle API enabled status' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApiManagementController.prototype, "toggleApiEnabled", null);
__decorate([
    (0, common_1.Post)(':id/test-connection'),
    (0, swagger_1.ApiOperation)({ summary: 'Test API connection' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApiManagementController.prototype, "testApiConnection", null);
__decorate([
    (0, common_1.Post)(':id/get-balance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get API balance' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApiManagementController.prototype, "getApiBalance", null);
__decorate([
    (0, common_1.Post)('update-all-statuses'),
    (0, swagger_1.ApiOperation)({ summary: 'Update all API statuses' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiManagementController.prototype, "updateAllStatuses", null);
__decorate([
    (0, common_1.Post)('update-all-balances'),
    (0, swagger_1.ApiOperation)({ summary: 'Update all API balances' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiManagementController.prototype, "updateAllBalances", null);
exports.ApiManagementController = ApiManagementController = __decorate([
    (0, swagger_1.ApiTags)('api-management'),
    (0, common_1.Controller)({ path: 'api-management', version: '1' }),
    __metadata("design:paramtypes", [api_management_service_1.ApiManagementService])
], ApiManagementController);
//# sourceMappingURL=api-management.controller.js.map