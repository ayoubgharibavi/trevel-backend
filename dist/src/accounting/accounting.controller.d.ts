import { AccountingService } from './accounting.service';
declare class CreateAccountDto {
    id: string;
    name: any;
    type: string;
    isParent?: boolean;
    parentId?: string;
}
declare class CreateExpenseDto {
    description: string;
    amount: number;
    accountId: string;
    date: string;
    userId: string;
}
declare class CreateJournalEntryDto {
    description: string;
    transactions: Array<{
        accountId: string;
        debit: number;
        credit: number;
    }>;
    userId: string;
}
export declare class AccountingController {
    private readonly accountingService;
    constructor(accountingService: AccountingService);
    getOverview(): Promise<{
        totalAccounts: number;
        totalJournalEntries: number;
        accountsByType: Record<string, number>;
    }>;
    getChartOfAccounts(): Promise<{
        id: string;
        name: string;
        balance: number;
        currency: string;
        code: string | null;
        type: import(".prisma/client").$Enums.AccountType;
        parentId: string | null;
        isParent: boolean;
    }[]>;
    createAccount(data: CreateAccountDto): Promise<{
        id: string;
        name: string;
        balance: number;
        currency: string;
        code: string | null;
        type: import(".prisma/client").$Enums.AccountType;
        parentId: string | null;
        isParent: boolean;
    }>;
    updateAccount(accountId: string, data: CreateAccountDto): Promise<{
        id: string;
        name: string;
        balance: number;
        currency: string;
        code: string | null;
        type: import(".prisma/client").$Enums.AccountType;
        parentId: string | null;
        isParent: boolean;
    }>;
    getJournalEntries(startDate?: string, endDate?: string): Promise<({
        transactions: ({
            account: {
                id: string;
                name: string;
                balance: number;
                currency: string;
                code: string | null;
                type: import(".prisma/client").$Enums.AccountType;
                parentId: string | null;
                isParent: boolean;
            };
        } & {
            id: string;
            debit: number;
            credit: number;
            accountId: string;
            journalEntryId: string;
        })[];
    } & {
        id: string;
        userId: string | null;
        description: string;
        bookingId: string | null;
        date: Date;
    })[]>;
    createJournalEntry(data: CreateJournalEntryDto): Promise<{
        transactions: ({
            account: {
                id: string;
                name: string;
                balance: number;
                currency: string;
                code: string | null;
                type: import(".prisma/client").$Enums.AccountType;
                parentId: string | null;
                isParent: boolean;
            };
        } & {
            id: string;
            debit: number;
            credit: number;
            accountId: string;
            journalEntryId: string;
        })[];
    } & {
        id: string;
        userId: string | null;
        description: string;
        bookingId: string | null;
        date: Date;
    }>;
    getExpenses(startDate?: string, endDate?: string): Promise<({
        account: {
            id: string;
            name: string;
            balance: number;
            currency: string;
            code: string | null;
            type: import(".prisma/client").$Enums.AccountType;
            parentId: string | null;
            isParent: boolean;
        };
    } & {
        id: string;
        currency: string;
        description: string;
        amount: number;
        date: Date;
        accountId: string;
        recordedByUserId: string;
    })[]>;
    createExpense(data: CreateExpenseDto): Promise<{
        id: string;
        currency: string;
        description: string;
        amount: number;
        date: Date;
        accountId: string;
        recordedByUserId: string;
    }>;
    getProfitLossReport(startDate: string, endDate: string): Promise<{
        period: {
            startDate: string;
            endDate: string;
        };
        revenue: number;
        expenses: number;
        netProfit: number;
        profitMargin: number;
    }>;
    getBalanceSheetReport(asOfDate: string): Promise<{
        asOfDate: string;
        assets: {
            accounts: ({
                transactions: {
                    id: string;
                    debit: number;
                    credit: number;
                    accountId: string;
                    journalEntryId: string;
                }[];
            } & {
                id: string;
                name: string;
                balance: number;
                currency: string;
                code: string | null;
                type: import(".prisma/client").$Enums.AccountType;
                parentId: string | null;
                isParent: boolean;
            })[];
            total: number;
        };
        liabilities: {
            accounts: ({
                transactions: {
                    id: string;
                    debit: number;
                    credit: number;
                    accountId: string;
                    journalEntryId: string;
                }[];
            } & {
                id: string;
                name: string;
                balance: number;
                currency: string;
                code: string | null;
                type: import(".prisma/client").$Enums.AccountType;
                parentId: string | null;
                isParent: boolean;
            })[];
            total: number;
        };
        equity: {
            accounts: ({
                transactions: {
                    id: string;
                    debit: number;
                    credit: number;
                    accountId: string;
                    journalEntryId: string;
                }[];
            } & {
                id: string;
                name: string;
                balance: number;
                currency: string;
                code: string | null;
                type: import(".prisma/client").$Enums.AccountType;
                parentId: string | null;
                isParent: boolean;
            })[];
            total: number;
        };
        totalLiabilitiesAndEquity: number;
        isBalanced: boolean;
    }>;
    getTrialBalanceReport(asOfDate: string): Promise<{
        asOfDate: string;
        accounts: {
            accountId: string;
            accountName: string;
            accountCode: string | null;
            accountType: import(".prisma/client").$Enums.AccountType;
            totalDebits: number;
            totalCredits: number;
            balance: number;
            creditBalance: number;
        }[];
        totalDebits: number;
        totalCredits: number;
        isBalanced: boolean;
    }>;
    getAccountLedger(accountId: string, startDate?: string, endDate?: string): Promise<{
        account: {
            id: string;
            name: string;
            balance: number;
            currency: string;
            code: string | null;
            type: import(".prisma/client").$Enums.AccountType;
            parentId: string | null;
            isParent: boolean;
        };
        period: {
            startDate: string | undefined;
            endDate: string | undefined;
        };
        transactions: {
            id: string;
            date: Date;
            description: string;
            debit: number;
            credit: number;
            balance: number;
        }[];
        openingBalance: number;
        closingBalance: number;
    }>;
}
export {};
