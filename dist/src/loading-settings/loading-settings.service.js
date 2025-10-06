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
exports.LoadingSettingsService = void 0;
const common_1 = require("@nestjs/common");
let LoadingSettingsService = class LoadingSettingsService {
    constructor() { }
    async getSettings() {
        try {
            return {
                success: true,
                data: {
                    loadingTimeout: 30000,
                    retryAttempts: 3,
                    cacheEnabled: true,
                    cacheTimeout: 300000,
                },
                message: 'Loading settings retrieved successfully',
            };
        }
        catch (error) {
            console.error('Error getting loading settings:', error);
            return {
                success: false,
                error: 'Failed to get loading settings',
            };
        }
    }
    async createSettings(createSettingsDto) {
        try {
            return {
                success: true,
                message: 'Loading settings created successfully',
                data: createSettingsDto,
            };
        }
        catch (error) {
            console.error('Error creating loading settings:', error);
            return {
                success: false,
                error: 'Failed to create loading settings',
            };
        }
    }
    async updateSettings(id, updateSettingsDto) {
        try {
            return {
                success: true,
                message: 'Loading settings updated successfully',
                data: { id, ...updateSettingsDto },
            };
        }
        catch (error) {
            console.error('Error updating loading settings:', error);
            return {
                success: false,
                error: 'Failed to update loading settings',
            };
        }
    }
};
exports.LoadingSettingsService = LoadingSettingsService;
exports.LoadingSettingsService = LoadingSettingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LoadingSettingsService);
//# sourceMappingURL=loading-settings.service.js.map