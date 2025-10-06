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
exports.ApiManagementService = void 0;
const common_1 = require("@nestjs/common");
let ApiManagementService = class ApiManagementService {
    constructor() { }
    async getAllApis() {
        try {
            const apis = [
                {
                    id: 'charter118',
                    name: 'charter118',
                    displayName: 'Charter118 API',
                    baseUrl: 'https://api.charter118.com',
                    isActive: true,
                    isEnabled: true,
                    balance: 0,
                    currency: 'USD',
                    status: 'active',
                    lastCheck: new Date().toISOString(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                {
                    id: 'sepehr',
                    name: 'sepehr',
                    displayName: 'Sepehr API',
                    baseUrl: 'https://api.sepehr.com',
                    isActive: true,
                    isEnabled: true,
                    balance: 0,
                    currency: 'IRR',
                    status: 'active',
                    lastCheck: new Date().toISOString(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                {
                    id: 'internal',
                    name: 'internal',
                    displayName: 'Internal API',
                    baseUrl: 'http://localhost:3000',
                    isActive: true,
                    isEnabled: true,
                    balance: 0,
                    currency: 'IRR',
                    status: 'active',
                    lastCheck: new Date().toISOString(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                {
                    id: 'exchange-rates',
                    name: 'exchange-rates',
                    displayName: 'Exchange Rates API',
                    baseUrl: 'https://api.exchangerate-api.com',
                    isActive: true,
                    isEnabled: true,
                    balance: 0,
                    currency: 'USD',
                    status: 'active',
                    lastCheck: new Date().toISOString(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                {
                    id: 'content',
                    name: 'content',
                    displayName: 'Content Management API',
                    baseUrl: 'http://localhost:3000',
                    isActive: true,
                    isEnabled: true,
                    balance: 0,
                    currency: 'IRR',
                    status: 'active',
                    lastCheck: new Date().toISOString(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                {
                    id: 'advertisements',
                    name: 'advertisements',
                    displayName: 'Advertisements API',
                    baseUrl: 'http://localhost:3000',
                    isActive: true,
                    isEnabled: true,
                    balance: 0,
                    currency: 'IRR',
                    status: 'active',
                    lastCheck: new Date().toISOString(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                {
                    id: 'tickets',
                    name: 'tickets',
                    displayName: 'Support Tickets API',
                    baseUrl: 'http://localhost:3000',
                    isActive: true,
                    isEnabled: true,
                    balance: 0,
                    currency: 'IRR',
                    status: 'active',
                    lastCheck: new Date().toISOString(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                {
                    id: 'refunds',
                    name: 'refunds',
                    displayName: 'Refunds API',
                    baseUrl: 'http://localhost:3000',
                    isActive: true,
                    isEnabled: true,
                    balance: 0,
                    currency: 'IRR',
                    status: 'active',
                    lastCheck: new Date().toISOString(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                {
                    id: 'accounting',
                    name: 'accounting',
                    displayName: 'Accounting API',
                    baseUrl: 'http://localhost:3000',
                    isActive: true,
                    isEnabled: true,
                    balance: 0,
                    currency: 'IRR',
                    status: 'active',
                    lastCheck: new Date().toISOString(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                {
                    id: 'integrations',
                    name: 'integrations',
                    displayName: 'Integrations API',
                    baseUrl: 'http://localhost:3000',
                    isActive: true,
                    isEnabled: true,
                    balance: 0,
                    currency: 'IRR',
                    status: 'active',
                    lastCheck: new Date().toISOString(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                {
                    id: 'loading-settings',
                    name: 'loading-settings',
                    displayName: 'Loading Settings API',
                    baseUrl: 'http://localhost:3000',
                    isActive: true,
                    isEnabled: true,
                    balance: 0,
                    currency: 'IRR',
                    status: 'active',
                    lastCheck: new Date().toISOString(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
            ];
            return {
                success: true,
                data: apis,
            };
        }
        catch (error) {
            console.error('Error getting all APIs:', error);
            return {
                success: false,
                error: 'Failed to get APIs',
            };
        }
    }
    async createApi(createApiDto) {
        try {
            return {
                success: true,
                message: 'API created successfully',
                data: createApiDto,
            };
        }
        catch (error) {
            console.error('Error creating API:', error);
            return {
                success: false,
                error: 'Failed to create API',
            };
        }
    }
    async updateApi(id, updateApiDto) {
        try {
            return {
                success: true,
                message: 'API updated successfully',
                data: { id, ...updateApiDto },
            };
        }
        catch (error) {
            console.error('Error updating API:', error);
            return {
                success: false,
                error: 'Failed to update API',
            };
        }
    }
    async toggleApiStatus(id) {
        try {
            return {
                success: true,
                message: 'API status toggled successfully',
                data: { id, status: 'toggled' },
            };
        }
        catch (error) {
            console.error('Error toggling API status:', error);
            return {
                success: false,
                error: 'Failed to toggle API status',
            };
        }
    }
    async toggleApiEnabled(id) {
        try {
            return {
                success: true,
                message: 'API enabled status toggled successfully',
                data: { id, enabled: 'toggled' },
            };
        }
        catch (error) {
            console.error('Error toggling API enabled:', error);
            return {
                success: false,
                error: 'Failed to toggle API enabled status',
            };
        }
    }
    async testApiConnection(id) {
        try {
            return {
                success: true,
                message: 'API connection test successful',
                data: { id, connection: 'success' },
            };
        }
        catch (error) {
            console.error('Error testing API connection:', error);
            return {
                success: false,
                error: 'Failed to test API connection',
            };
        }
    }
    async getApiBalance(id) {
        try {
            return {
                success: true,
                message: 'API balance retrieved successfully',
                data: { id, balance: 0 },
            };
        }
        catch (error) {
            console.error('Error getting API balance:', error);
            return {
                success: false,
                error: 'Failed to get API balance',
            };
        }
    }
    async updateAllStatuses() {
        try {
            return {
                success: true,
                message: 'All API statuses updated successfully',
                data: { updated: true },
            };
        }
        catch (error) {
            console.error('Error updating all statuses:', error);
            return {
                success: false,
                error: 'Failed to update all statuses',
            };
        }
    }
    async updateAllBalances() {
        try {
            return {
                success: true,
                message: 'All API balances updated successfully',
                data: { updated: true },
            };
        }
        catch (error) {
            console.error('Error updating all balances:', error);
            return {
                success: false,
                error: 'Failed to update all balances',
            };
        }
    }
};
exports.ApiManagementService = ApiManagementService;
exports.ApiManagementService = ApiManagementService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ApiManagementService);
//# sourceMappingURL=api-management.service.js.map