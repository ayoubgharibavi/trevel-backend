"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationsService = void 0;
const common_1 = require("@nestjs/common");
let IntegrationsService = class IntegrationsService {
    async getTelegramConfig() {
        return {
            isEnabled: false,
            botToken: '',
            chatId: '',
            notifyOn: {
                newBooking: true,
                bookingCancellation: true,
                refundUpdate: true,
                newUser: true,
                newTicket: true,
            }
        };
    }
    async updateTelegramConfig(config) {
        return {
            success: true,
            message: 'تنظیمات تلگرام با موفقیت به‌روزرسانی شد'
        };
    }
    async testTelegramMessage(message) {
        console.log(`[Telegram Bot Test] ${message}`);
        return {
            success: true,
            message: 'پیام تست با موفقیت ارسال شد'
        };
    }
    async getWhatsAppConfig() {
        return {
            isEnabled: false,
            apiKey: '',
            phoneNumberId: '',
            notifyOn: {
                bookingSuccess: true,
                flightChange: true,
            }
        };
    }
    async updateWhatsAppConfig(config) {
        return {
            success: true,
            message: 'تنظیمات واتس‌اپ با موفقیت به‌روزرسانی شد'
        };
    }
    async testWhatsAppMessage(message, phoneNumber) {
        console.log(`[WhatsApp Bot Test] To: ${phoneNumber}, Message: ${message}`);
        return {
            success: true,
            message: 'پیام تست با موفقیت ارسال شد'
        };
    }
};
exports.IntegrationsService = IntegrationsService;
exports.IntegrationsService = IntegrationsService = __decorate([
    (0, common_1.Injectable)()
], IntegrationsService);
//# sourceMappingURL=integrations.service.js.map