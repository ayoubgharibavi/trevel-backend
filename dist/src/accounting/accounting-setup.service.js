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
exports.AccountingSetupService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let AccountingSetupService = class AccountingSetupService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        await this.ensureDefaultAccounts();
    }
    async ensureDefaultAccounts() {
        console.log('📊 Ensuring default accounting accounts exist...');
        const defaultAccounts = [
            {
                id: '1000',
                name: 'دارایی‌ها (Assets)',
                code: '1000',
                type: client_1.AccountType.ASSET,
                parentId: null,
                isParent: true,
                balance: 0,
                currency: 'IRR'
            },
            {
                id: '1010',
                name: 'نقد و معادل نقد (Cash)',
                code: '1010',
                type: client_1.AccountType.ASSET,
                parentId: '1000',
                isParent: false,
                balance: 0,
                currency: 'IRR'
            },
            {
                id: '1020',
                name: 'حساب‌های دریافتنی (Receivables)',
                code: '1020',
                type: client_1.AccountType.ASSET,
                parentId: '1000',
                isParent: false,
                balance: 0,
                currency: 'IRR'
            },
            {
                id: '2000',
                name: 'بدهی‌ها (Liabilities)',
                code: '2000',
                type: client_1.AccountType.LIABILITY,
                parentId: null,
                isParent: true,
                balance: 0,
                currency: 'IRR'
            },
            {
                id: '2010',
                name: 'بدهی به مشتری - کیف پول (Customer Liability)',
                code: '2010',
                type: client_1.AccountType.LIABILITY,
                parentId: '2000',
                isParent: false,
                balance: 0,
                currency: 'IRR'
            },
            {
                id: '4000',
                name: 'درآمدها (Revenue)',
                code: '4000',
                type: client_1.AccountType.REVENUE,
                parentId: null,
                isParent: true,
                balance: 0,
                currency: 'IRR'
            },
            {
                id: '4010',
                name: 'درآمد فروش بلیط (Ticket Sales)',
                code: '4010',
                type: client_1.AccountType.REVENUE,
                parentId: '4000',
                isParent: false,
                balance: 0,
                currency: 'IRR'
            },
            {
                id: '5000',
                name: 'هزینه‌ها (Expenses)',
                code: '5000',
                type: client_1.AccountType.EXPENSE,
                parentId: null,
                isParent: true,
                balance: 0,
                currency: 'IRR'
            },
            {
                id: '5010',
                name: 'هزینه خرید بلیط (Ticket Cost)',
                code: '5010',
                type: client_1.AccountType.EXPENSE,
                parentId: '5000',
                isParent: false,
                balance: 0,
                currency: 'IRR'
            },
        ];
        for (const accountData of defaultAccounts) {
            await this.prisma.account.upsert({
                where: { id: accountData.id },
                update: {
                    name: accountData.name,
                    code: accountData.code,
                    type: accountData.type,
                    parentId: accountData.parentId,
                    isParent: accountData.isParent,
                    currency: accountData.currency,
                },
                create: accountData,
            });
        }
        console.log('✅ Default accounting accounts ensured.');
    }
    async initializeAccounts() {
        console.log('🔧 Initializing accounting accounts...');
        await this.ensureDefaultAccounts();
        console.log('✅ Accounting accounts initialized successfully');
    }
    async getAccountById(accountId) {
        return this.prisma.account.findUnique({
            where: { id: accountId }
        });
    }
};
exports.AccountingSetupService = AccountingSetupService;
exports.AccountingSetupService = AccountingSetupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccountingSetupService);
//# sourceMappingURL=accounting-setup.service.js.map