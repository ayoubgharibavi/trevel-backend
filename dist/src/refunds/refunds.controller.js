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
exports.RefundsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const refunds_service_1 = require("./refunds.service");
class CreateRefundDto {
}
class UpdateRefundDto {
}
let RefundsController = class RefundsController {
    constructor(refundsService) {
        this.refundsService = refundsService;
    }
    async getUserRefunds(req) {
        return this.refundsService.getUserRefunds(req.user.userId);
    }
    async requestRefund(req, body) {
        return this.refundsService.requestRefund(req.user.userId, body);
    }
    async getAllRefunds(status) {
        return this.refundsService.getAllRefunds(status);
    }
    async updateRefund(refundId, body) {
        return this.refundsService.updateRefund(refundId, body.action, body.reason);
    }
    async getRefund(req, refundId) {
        return this.refundsService.getRefund(req.user.userId, refundId);
    }
};
exports.RefundsController = RefundsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get user refunds' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RefundsController.prototype, "getUserRefunds", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Request refund' }),
    (0, swagger_1.ApiBody)({ type: CreateRefundDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateRefundDto]),
    __metadata("design:returntype", Promise)
], RefundsController.prototype, "requestRefund", null);
__decorate([
    (0, common_1.Get)('admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all refunds (admin)' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RefundsController.prototype, "getAllRefunds", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update refund status (admin)' }),
    (0, swagger_1.ApiBody)({ type: UpdateRefundDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateRefundDto]),
    __metadata("design:returntype", Promise)
], RefundsController.prototype, "updateRefund", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get refund details' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RefundsController.prototype, "getRefund", null);
exports.RefundsController = RefundsController = __decorate([
    (0, swagger_1.ApiTags)('refunds'),
    (0, common_1.Controller)({ path: 'refunds', version: '1' }),
    __metadata("design:paramtypes", [refunds_service_1.RefundsService])
], RefundsController);
//# sourceMappingURL=refunds.controller.js.map