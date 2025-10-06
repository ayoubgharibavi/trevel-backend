import { PrismaService } from '../prisma/prisma.service';
import { AccountingSetupService } from './accounting-setup.service';
export declare class AccountingService {
    private prisma;
    private accountingSetup;
    constructor(prisma: PrismaService, accountingSetup: AccountingSetupService);
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
    createAccount(data: any): Promise<{
        id: string;
        name: string;
        balance: number;
        currency: string;
        code: string | null;
        type: import(".prisma/client").$Enums.AccountType;
        parentId: string | null;
        isParent: boolean;
    }>;
    updateAccount(accountId: string, data: any): Promise<{
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
    createJournalEntry(data: any): Promise<{
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
    createExpense(data: any): Promise<{
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
    createWalletChargeEntry(userId: string, amount: number, description: string): Promise<{
        success: boolean;
        journalEntry: {
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
        };
        message: string;
    } | {
        success: boolean;
        message: string;
        journalEntry?: undefined;
    }>;
    createBookingEntry(bookingId: string, userId: string, totalAmount: number, flightCost: number): Promise<{
        success: boolean;
        journalEntry: {
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
        };
        message: string;
        profit: number;
    } | {
        success: boolean;
        message: string;
        journalEntry?: undefined;
        profit?: undefined;
    }>;
    private updateAccountBalance;
}
