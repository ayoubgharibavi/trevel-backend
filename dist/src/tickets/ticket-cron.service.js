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
exports.TicketCronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../prisma/prisma.service");
let TicketCronService = class TicketCronService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async autoCloseOldTickets() {
        console.log('🕐 Running auto-close check for old tickets...');
        const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
        const oldTickets = await this.prisma.ticket.findMany({
            where: {
                status: {
                    in: ['WAITING_FOR_SUPPORT', 'RESPONDED']
                },
                updatedAt: {
                    lt: fortyEightHoursAgo
                }
            }
        });
        console.log(`🕐 Found ${oldTickets.length} tickets to auto-close`);
        for (const ticket of oldTickets) {
            await this.prisma.ticket.update({
                where: { id: ticket.id },
                data: {
                    status: 'COMPLETED',
                    updatedAt: new Date(),
                },
            });
            console.log(`✅ Auto-closed ticket ${ticket.id} (${ticket.subject})`);
        }
        if (oldTickets.length > 0) {
            console.log(`🎯 Auto-closed ${oldTickets.length} tickets`);
        }
    }
};
exports.TicketCronService = TicketCronService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketCronService.prototype, "autoCloseOldTickets", null);
exports.TicketCronService = TicketCronService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TicketCronService);
//# sourceMappingURL=ticket-cron.service.js.map