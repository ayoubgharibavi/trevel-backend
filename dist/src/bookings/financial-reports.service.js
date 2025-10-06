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
exports.FinancialReportsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FinancialReportsService = class FinancialReportsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserFinancialSummary(userId) {
        const wallet = await this.prisma.wallet.findUnique({
            where: {
                userId_currency: {
                    userId,
                    currency: 'IRR'
                }
            }
        });
        const transactions = await this.prisma.walletTransaction.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
            take: 10
        });
        const bookings = await this.prisma.booking.findMany({
            where: { userId },
            include: {
                flight: {
                    include: {
                        departureAirport: true,
                        arrivalAirport: true
                    }
                }
            },
            orderBy: { bookingDate: 'desc' },
            take: 10
        });
        const totalSpent = await this.prisma.walletTransaction.aggregate({
            where: {
                userId,
                type: 'BOOKING_PAYMENT'
            },
            _sum: {
                amount: true
            }
        });
        return {
            wallet: {
                balance: wallet ? Number(wallet.balance) : 0,
                currency: 'IRR'
            },
            summary: {
                totalSpent: Number(totalSpent._sum.amount || 0),
                totalBookings: bookings.length,
                lastTransaction: transactions[0] || null
            },
            recentTransactions: transactions.map(t => ({
                id: t.id,
                date: t.date,
                type: t.type,
                amount: Number(t.amount),
                description: t.description,
                bookingId: t.relatedBookingId
            })),
            recentBookings: bookings.map(b => ({
                id: b.id,
                date: b.bookingDate,
                amount: b.totalPrice,
                status: b.status,
                flight: {
                    from: b.flight.departureAirport?.name || 'Unknown',
                    to: b.flight.arrivalAirport?.name || 'Unknown',
                    date: b.flight.departureTime
                }
            }))
        };
    }
    async getProfitLossReport(startDate, endDate) {
        const whereClause = {};
        if (startDate && endDate) {
            whereClause.date = {
                gte: startDate,
                lte: endDate
            };
        }
        const journalEntries = await this.prisma.journalEntry.findMany({
            where: whereClause,
            include: {
                transactions: {
                    include: {
                        account: true
                    }
                }
            }
        });
        const revenueTransactions = journalEntries
            .flatMap(je => je.transactions)
            .filter(t => t.accountId === '4011');
        const totalRevenue = revenueTransactions.reduce((sum, t) => sum + t.credit, 0);
        const cogsTransactions = journalEntries
            .flatMap(je => je.transactions)
            .filter(t => t.accountId === '5011');
        const totalCOGS = cogsTransactions.reduce((sum, t) => sum + t.debit, 0);
        const grossProfit = totalRevenue - totalCOGS;
        const bookingStats = await this.prisma.booking.aggregate({
            where: {
                bookingDate: startDate && endDate ? {
                    gte: startDate,
                    lte: endDate
                } : undefined
            },
            _count: {
                id: true
            },
            _sum: {
                totalPrice: true
            }
        });
        return {
            period: {
                startDate: startDate || null,
                endDate: endDate || null
            },
            revenue: {
                total: totalRevenue,
                currency: 'IRR',
                transactions: revenueTransactions.length
            },
            costs: {
                total: totalCOGS,
                currency: 'IRR',
                transactions: cogsTransactions.length
            },
            profit: {
                gross: grossProfit,
                margin: totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0,
                currency: 'IRR'
            },
            bookings: {
                total: bookingStats._count?.id || 0,
                totalRevenue: bookingStats._sum?.totalPrice || 0
            }
        };
    }
    async generateInvoice(bookingId, userId) {
        const booking = await this.prisma.booking.findFirst({
            where: { id: bookingId, userId },
            include: {
                flight: {
                    include: {
                        departureAirport: true,
                        arrivalAirport: true,
                        airlineInfo: true
                    }
                },
                user: true
            }
        });
        if (!booking) {
            throw new Error('Booking not found');
        }
        const journalEntry = await this.prisma.journalEntry.findFirst({
            where: { bookingId },
            include: {
                transactions: {
                    include: {
                        account: true
                    }
                }
            }
        });
        const invoiceNumber = `INV-${bookingId.slice(-8).toUpperCase()}`;
        const issueDate = new Date();
        const dueDate = new Date(issueDate.getTime() + 30 * 24 * 60 * 60 * 1000);
        return {
            invoice: {
                number: invoiceNumber,
                issueDate,
                dueDate,
                status: 'PAID'
            },
            customer: {
                name: booking.user.name,
                email: booking.user.email,
                id: booking.user.id
            },
            booking: {
                id: booking.id,
                date: booking.bookingDate,
                status: booking.status
            },
            flight: {
                airline: booking.flight.airlineInfo?.name || booking.flight.airline,
                flightNumber: booking.flight.flightNumber,
                from: booking.flight.departureAirport?.name || 'Unknown',
                to: booking.flight.arrivalAirport?.name || 'Unknown',
                departureDate: booking.flight.departureTime,
                arrivalDate: booking.flight.arrivalTime
            },
            financial: {
                subtotal: booking.totalPrice,
                tax: 0,
                total: booking.totalPrice,
                currency: 'IRR'
            },
            accounting: journalEntry ? {
                journalEntryId: journalEntry.id,
                transactions: journalEntry.transactions.map(t => ({
                    account: t.account.name,
                    accountCode: t.account.code,
                    debit: t.debit,
                    credit: t.credit
                }))
            } : null
        };
    }
    async getUserTravelExpenses(userId, startDate, endDate) {
        const whereClause = { userId };
        if (startDate && endDate) {
            whereClause.createdAt = {
                gte: startDate,
                lte: endDate
            };
        }
        const bookings = await this.prisma.booking.findMany({
            where: whereClause,
            include: {
                flight: {
                    include: {
                        departureAirport: true,
                        arrivalAirport: true
                    }
                }
            },
            orderBy: { bookingDate: 'desc' }
        });
        const totalExpenses = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
        return {
            period: {
                startDate: startDate || null,
                endDate: endDate || null
            },
            summary: {
                totalExpenses,
                totalTrips: bookings.length,
                averagePerTrip: bookings.length > 0 ? totalExpenses / bookings.length : 0,
                currency: 'IRR'
            },
            trips: bookings.map(b => ({
                id: b.id,
                date: b.bookingDate,
                amount: b.totalPrice,
                status: b.status,
                route: `${b.flight.departureAirport?.name || 'Unknown'} → ${b.flight.arrivalAirport?.name || 'Unknown'}`,
                departureDate: b.flight.departureTime
            }))
        };
    }
};
exports.FinancialReportsService = FinancialReportsService;
exports.FinancialReportsService = FinancialReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FinancialReportsService);
//# sourceMappingURL=financial-reports.service.js.map