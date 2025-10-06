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
exports.LoadingSettingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const loading_settings_service_1 = require("./loading-settings.service");
let LoadingSettingsController = class LoadingSettingsController {
    constructor(loadingSettingsService) {
        this.loadingSettingsService = loadingSettingsService;
    }
    async getSettings() {
        return this.loadingSettingsService.getSettings();
    }
    async createSettings(createSettingsDto) {
        return this.loadingSettingsService.createSettings(createSettingsDto);
    }
    async updateSettings(id, updateSettingsDto) {
        return this.loadingSettingsService.updateSettings(id, updateSettingsDto);
    }
};
exports.LoadingSettingsController = LoadingSettingsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get loading settings' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LoadingSettingsController.prototype, "getSettings", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create loading settings' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoadingSettingsController.prototype, "createSettings", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update loading settings' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LoadingSettingsController.prototype, "updateSettings", null);
exports.LoadingSettingsController = LoadingSettingsController = __decorate([
    (0, swagger_1.ApiTags)('loading-settings'),
    (0, common_1.Controller)({ path: 'loading-settings', version: '1' }),
    __metadata("design:paramtypes", [loading_settings_service_1.LoadingSettingsService])
], LoadingSettingsController);
//# sourceMappingURL=loading-settings.controller.js.map