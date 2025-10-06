"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundsService = void 0;
const common_1 = require("@nestjs/common");
let RefundsService = class RefundsService {
    async getUserRefunds(userId) {
        return [
            {
                id: 'REF-001',
                bookingId: 'BK16252435123',
                userId,
                requestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                status: 'PENDING_EXPERT_REVIEW',
                originalAmount: 11000000,
                penaltyAmount: 1100000,
                refundAmount: 9900000,
                reason: 'تغییر برنامه سفر',
                currency: 'IRR'
            }
        ];
    }
    async requestRefund(userId, data) {
        const newRefund = {
            id: `REF-${Date.now()}`,
            bookingId: data.bookingId,
            userId,
            requestDate: new Date().toISOString(),
            status: 'PENDING_EXPERT_REVIEW',
            originalAmount: 11000000,
            penaltyAmount: 1100000,
            refundAmount: 9900000,
            reason: data.reason || 'درخواست استرداد',
            currency: 'IRR'
        };
        return {
            success: true,
            refund: newRefund,
            message: 'درخواست استرداد ثبت شد و در حال بررسی است'
        };
    }
    async getAllRefunds(status) {
        const allRefunds = [
            {
                id: 'REF-001',
                bookingId: 'BK16252435123',
                user: { name: 'احمد محمدی', email: 'ahmad@example.com' },
                requestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                status: 'PENDING_EXPERT_REVIEW',
                originalAmount: 11000000,
                penaltyAmount: 1100000,
                refundAmount: 9900000,
                reason: 'تغییر برنامه سفر'
            },
            {
                id: 'REF-002',
                bookingId: 'BK16252435456',
                user: { name: 'فاطمه احمدی', email: 'fatemeh@example.com' },
                requestDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                status: 'PENDING_FINANCIAL_REVIEW',
                originalAmount: 15000000,
                penaltyAmount: 1500000,
                refundAmount: 13500000,
                reason: 'لغو سفر'
            }
        ];
        return status ? allRefunds.filter(r => r.status === status) : allRefunds;
    }
    async updateRefund(refundId, action, reason) {
        const actionMessages = {
            expert_approve: 'استرداد توسط کارشناس تایید شد',
            financial_approve: 'استرداد توسط واحد مالی تایید شد',
            process_payment: 'مبلغ استرداد پرداخت شد',
            reject: 'درخواست استرداد رد شد'
        };
        return {
            success: true,
            message: actionMessages[action] || 'وضعیت به‌روزرسانی شد'
        };
    }
    async getRefund(userId, refundId) {
        return {
            id: refundId,
            bookingId: 'BK16252435123',
            userId,
            requestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'PENDING_EXPERT_REVIEW',
            originalAmount: 11000000,
            penaltyAmount: 1100000,
            refundAmount: 9900000,
            reason: 'تغییر برنامه سفر',
            currency: 'IRR',
            booking: {
                id: 'BK16252435123',
                flight: {
                    flightNumber: 'IR-452',
                    departure: { city: 'تهران', dateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() },
                    arrival: { city: 'استانبول', dateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString() }
                }
            }
        };
    }
};
exports.RefundsService = RefundsService;
exports.RefundsService = RefundsService = __decorate([
    (0, common_1.Injectable)()
], RefundsService);
//# sourceMappingURL=refunds.service.js.map