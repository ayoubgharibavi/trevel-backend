"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                savedPassengers: true,
                wallets: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async updateProfile(userId, data) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (data.newPassword) {
            if (!data.currentPassword) {
                throw new common_1.BadRequestException('Current password is required to set a new password');
            }
            const isPasswordValid = await bcrypt.compare(data.currentPassword, user.passwordHash);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException('Invalid current password');
            }
            if (data.newPassword.length < 8) {
                throw new common_1.BadRequestException('New password must be at least 8 characters long');
            }
            if (!/[A-Z]/.test(data.newPassword)) {
                throw new common_1.BadRequestException('New password must contain at least one uppercase letter');
            }
            if (!/[a-z]/.test(data.newPassword)) {
                throw new common_1.BadRequestException('New password must contain at least one lowercase letter');
            }
            if (!/[0-9]/.test(data.newPassword)) {
                throw new common_1.BadRequestException('New password must contain at least one number');
            }
            if (!/[^A-Za-z0-9]/.test(data.newPassword)) {
                throw new common_1.BadRequestException('New password must contain at least one special character');
            }
            data.newPassword = await bcrypt.hash(data.newPassword, 10);
        }
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: {
                name: data.name,
                passwordHash: data.newPassword,
            },
            select: { id: true, name: true, username: true, email: true, phone: true, role: true, status: true, createdAt: true, displayCurrencies: true, savedPassengers: true, tenantId: true, canBypassRateLimit: true, },
        });
        return { success: true, message: 'Profile updated successfully', user: updatedUser };
    }
    async getWallet(userId) {
        const wallets = await this.prisma.wallet.findMany({
            where: { userId },
        });
        const transactions = await this.prisma.walletTransaction.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
        });
        if (!wallets || wallets.length === 0) {
            return {};
        }
        const walletData = {};
        for (const wallet of wallets) {
            const currencyTransactions = transactions.filter(tx => tx.currency === wallet.currency);
            walletData[wallet.currency] = {
                balance: Number(wallet.balance),
                currency: wallet.currency,
                transactions: currencyTransactions.map(tx => ({
                    id: tx.id,
                    date: tx.date.toISOString(),
                    type: tx.type,
                    amount: Number(tx.amount),
                    currency: tx.currency,
                    description: tx.description,
                    relatedBookingId: tx.relatedBookingId,
                    relatedUserId: tx.relatedUserId,
                })),
            };
        }
        return walletData;
    }
    async getSavedPassengers(userId) {
        console.log('🔍 getSavedPassengers called for userId:', userId);
        try {
            const passengers = await this.prisma.savedPassenger.findMany({ where: { userId } });
            console.log('✅ Found saved passengers:', passengers.length);
            return passengers;
        }
        catch (error) {
            console.error('❌ Error getting saved passengers:', error);
            throw error;
        }
    }
    async addSavedPassenger(userId, data) {
        console.log('🔍 addSavedPassenger called with:', { userId, data });
        try {
            const newPassenger = await this.prisma.savedPassenger.create({
                data: {
                    ...data,
                    userId,
                },
            });
            console.log('✅ Saved passenger created:', newPassenger);
            return { success: true, passenger: newPassenger };
        }
        catch (error) {
            console.error('❌ Error creating saved passenger:', error);
            throw error;
        }
    }
    async updateSavedPassenger(userId, passengerId, data) {
        const existingPassenger = await this.prisma.savedPassenger.findUnique({
            where: { id: passengerId },
        });
        if (!existingPassenger || existingPassenger.userId !== userId) {
            throw new common_1.NotFoundException('مسافر ذخیره شده یافت نشد');
        }
        await this.prisma.savedPassenger.update({
            where: { id: passengerId },
            data,
        });
        return { success: true, message: 'مسافر با موفقیت به‌روزرسانی شد' };
    }
    async deleteSavedPassenger(userId, passengerId) {
        const existingPassenger = await this.prisma.savedPassenger.findUnique({
            where: { id: passengerId },
        });
        if (!existingPassenger || existingPassenger.userId !== userId) {
            throw new common_1.NotFoundException('مسافر ذخیره شده یافت نشد');
        }
        await this.prisma.savedPassenger.delete({
            where: { id: passengerId },
        });
        return { success: true, message: 'مسافر با موفقیت حذف شد' };
    }
    async getAffiliateStats(userId) {
        const totalBookings = await this.prisma.booking.count({
            where: { userId, status: 'CONFIRMED' },
        });
        const totalFlights = await this.prisma.flight.count({
            where: { creatorId: userId },
        });
        const totalEarningsResult = await this.prisma.booking.aggregate({
            _sum: { totalPrice: true },
            where: { userId, status: 'CONFIRMED' },
        });
        const totalEarnings = totalEarningsResult._sum.totalPrice ? Number(totalEarningsResult._sum.totalPrice) * 0.05 : 0;
        const monthlyEarnings = [];
        const now = new Date();
        for (let i = 3; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
            const monthlyRevenue = await this.prisma.booking.aggregate({
                _sum: { totalPrice: true },
                where: {
                    userId,
                    status: 'CONFIRMED',
                    bookingDate: {
                        gte: startOfMonth,
                        lte: endOfMonth,
                    },
                },
            });
            monthlyEarnings.push({
                month: startOfMonth.toLocaleString('fa-IR', { month: 'long' }),
                earnings: monthlyRevenue._sum.totalPrice ? Number(monthlyRevenue._sum.totalPrice) * 0.05 : 0,
            });
        }
        const topRoutes = await this.prisma.booking.groupBy({
            by: ['flightId'],
            where: { userId, status: 'CONFIRMED' },
            _count: { id: true },
            _sum: { totalPrice: true },
            orderBy: { _count: { id: 'desc' } },
            take: 2,
        });
        const populatedTopRoutes = await Promise.all(topRoutes.map(async (route) => {
            const flight = await this.prisma.flight.findUnique({
                where: { id: route.flightId },
                select: {
                    departureAirport: { select: { city: true } },
                    arrivalAirport: { select: { city: true } },
                },
            });
            return {
                route: `${flight?.departureAirport?.city?.fa || ''} - ${flight?.arrivalAirport?.city?.fa || ''}`,
                bookings: route._count.id,
                earnings: Number(route._sum.totalPrice || 0) * 0.05,
            };
        }));
        return {
            totalEarnings,
            totalBookings,
            totalFlights,
            conversionRate: totalBookings && totalFlights ? (totalBookings / totalFlights) * 100 : 0,
            monthlyEarnings,
            topRoutes: populatedTopRoutes,
        };
    }
    async getAffiliateFlights(userId) {
        return this.prisma.flight.findMany({
            where: { creatorId: userId },
            include: {
                departureAirport: true,
                arrivalAirport: true,
                airlineInfo: true,
                flightClassInfo: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getAffiliateBookings(userId) {
        return this.prisma.booking.findMany({
            where: { userId },
            include: {
                flight: {
                    select: {
                        flightNumber: true,
                        departureAirport: { select: { city: true } },
                        arrivalAirport: { select: { city: true } },
                    },
                },
                user: { select: { name: true } },
            },
            orderBy: { bookingDate: 'desc' },
        });
    }
    async getAffiliateAccounting(userId) {
        const userBookings = await this.prisma.booking.findMany({
            where: { userId, status: 'CONFIRMED' },
            include: {
                flight: { include: { commissionModel: true } },
            },
        });
        let totalEarnings = 0;
        let pendingCommissions = 0;
        for (const booking of userBookings) {
            if (booking.flight.commissionModel) {
                const commissionRate = booking.flight.commissionModel.charterCommission;
                const bookingCommission = Number(booking.totalPrice) * (commissionRate / 100);
                totalEarnings += bookingCommission;
                const paidTransaction = await this.prisma.walletTransaction.findFirst({
                    where: {
                        userId,
                        type: 'COMMISSION_PAYOUT',
                        relatedBookingId: booking.id,
                    },
                });
                if (!paidTransaction) {
                    pendingCommissions += bookingCommission;
                }
            }
        }
        const paidCommissionsTransactions = await this.prisma.walletTransaction.aggregate({
            _sum: { amount: true },
            where: {
                userId,
                type: 'COMMISSION_PAYOUT',
            },
        });
        const paidCommissions = paidCommissionsTransactions._sum.amount ? Number(paidCommissionsTransactions._sum.amount) : 0;
        const transactions = await this.prisma.walletTransaction.findMany({
            where: {
                userId,
                OR: [
                    { type: 'COMMISSION_PAYOUT' },
                    { type: 'DEPOSIT' },
                    { type: 'WITHDRAWAL' },
                ],
            },
            orderBy: { date: 'desc' },
        });
        const commissionRate = userBookings.length > 0 && userBookings[0].flight.commissionModel
            ? userBookings[0].flight.commissionModel.charterCommission
            : 0;
        return {
            totalEarnings,
            pendingCommissions,
            paidCommissions,
            commissionRate,
            transactions: transactions.map(tx => ({
                id: tx.id,
                date: tx.date.toISOString(),
                type: tx.type,
                amount: Number(tx.amount),
                description: tx.description,
                bookingId: tx.relatedBookingId,
            })),
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map