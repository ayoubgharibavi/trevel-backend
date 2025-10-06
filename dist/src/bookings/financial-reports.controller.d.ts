import { FinancialReportsService } from './financial-reports.service';
import { Request as ExpressRequest } from 'express';
interface AuthenticatedRequest extends ExpressRequest {
    user: {
        sub: string;
        username: string;
        role: string;
    };
}
export declare class FinancialReportsController {
    private readonly financialReportsService;
    constructor(financialReportsService: FinancialReportsService);
    getUserFinancialSummary(req: AuthenticatedRequest): Promise<{
        wallet: {
            balance: number;
            currency: string;
        };
        summary: {
            totalSpent: number;
            totalBookings: number;
            lastTransaction: {
                id: string;
                userId: string;
                currency: string;
                description: string;
                type: import(".prisma/client").$Enums.TransactionType;
                amount: bigint;
                date: Date;
                relatedBookingId: string | null;
                relatedUserId: string | null;
            };
        };
        recentTransactions: {
            id: string;
            date: Date;
            type: import(".prisma/client").$Enums.TransactionType;
            amount: number;
            description: string;
            bookingId: string | null;
        }[];
        recentBookings: {
            id: string;
            date: Date;
            amount: number | null;
            status: import(".prisma/client").$Enums.BookingStatus;
            flight: {
                from: string;
                to: string;
                date: Date;
            };
        }[];
    }>;
    getProfitLossReport(startDate?: string, endDate?: string): Promise<{
        period: {
            startDate: Date | null;
            endDate: Date | null;
        };
        revenue: {
            total: number;
            currency: string;
            transactions: number;
        };
        costs: {
            total: number;
            currency: string;
            transactions: number;
        };
        profit: {
            gross: number;
            margin: number;
            currency: string;
        };
        bookings: {
            total: number;
            totalRevenue: number;
        };
    }>;
    getUserTravelExpenses(req: AuthenticatedRequest, startDate?: string, endDate?: string): Promise<{
        period: {
            startDate: Date | null;
            endDate: Date | null;
        };
        summary: {
            totalExpenses: number;
            totalTrips: number;
            averagePerTrip: number;
            currency: string;
        };
        trips: {
            id: string;
            date: Date;
            amount: number | null;
            status: import(".prisma/client").$Enums.BookingStatus;
            route: string;
            departureDate: Date;
        }[];
    }>;
    generateInvoice(bookingId: string, req: AuthenticatedRequest): Promise<{
        invoice: {
            number: string;
            issueDate: Date;
            dueDate: Date;
            status: string;
        };
        customer: {
            name: string;
            email: string;
            id: string;
        };
        booking: {
            id: string;
            date: Date;
            status: import(".prisma/client").$Enums.BookingStatus;
        };
        flight: {
            airline: string;
            flightNumber: string;
            from: string;
            to: string;
            departureDate: Date;
            arrivalDate: Date;
        };
        financial: {
            subtotal: number | null;
            tax: number;
            total: number | null;
            currency: string;
        };
        accounting: {
            journalEntryId: string;
            transactions: {
                account: string;
                accountCode: string | null;
                debit: number;
                credit: number;
            }[];
        } | null;
    }>;
}
export {};
