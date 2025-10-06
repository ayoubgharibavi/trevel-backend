import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
export declare class AccountingSetupService implements OnModuleInit {
    private prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    private ensureDefaultAccounts;
    initializeAccounts(): Promise<void>;
    getAccountById(accountId: string): Promise<{
        id: string;
        name: string;
        balance: number;
        currency: string;
        code: string | null;
        type: import(".prisma/client").$Enums.AccountType;
        parentId: string | null;
        isParent: boolean;
    } | null>;
}
