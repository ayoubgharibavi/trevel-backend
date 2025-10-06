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
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TicketsService = class TicketsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserTickets(userId) {
        const tickets = await this.prisma.ticket.findMany({
            where: { userId },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        name: true
                    }
                },
                messages: {
                    orderBy: { timestamp: 'asc' }
                }
            },
            orderBy: { updatedAt: 'desc' }
        });
        return tickets.map(ticket => ({
            id: ticket.id,
            subject: ticket.subject,
            status: ticket.status,
            priority: ticket.priority,
            createdAt: ticket.createdAt.toISOString(),
            updatedAt: ticket.updatedAt.toISOString(),
            bookingId: ticket.bookingId,
            user: ticket.user,
            messages: ticket.messages.map(msg => ({
                id: msg.id,
                author: msg.authorType,
                authorName: msg.authorType === 'USER' ? ticket.user?.name || ticket.user?.username : 'پشتیبانی',
                text: msg.text,
                timestamp: msg.timestamp.toISOString()
            }))
        }));
    }
    async createTicket(userId, data) {
        const newTicket = await this.prisma.ticket.create({
            data: {
                userId,
                subject: data.subject,
                status: 'WAITING_FOR_SUPPORT',
                priority: data.priority || 'MEDIUM',
                bookingId: data.bookingId,
                messages: {
                    create: {
                        authorId: userId,
                        authorType: 'USER',
                        text: data.message,
                        timestamp: new Date(),
                    },
                },
            },
            include: {
                messages: {
                    orderBy: { timestamp: 'asc' }
                },
                user: {
                    select: {
                        id: true,
                        username: true,
                        name: true
                    }
                }
            },
        });
        return {
            success: true,
            ticket: newTicket,
            message: 'تیکت شما با موفقیت ایجاد شد',
        };
    }
    async getTicket(userId, ticketId) {
        return {
            id: ticketId,
            userId,
            subject: 'درخواست تغییر صندلی',
            status: 'OPEN',
            priority: 'MEDIUM',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            bookingId: 'BK16252435123',
            messages: [
                {
                    id: 'msg-1',
                    author: 'USER',
                    authorName: 'کاربر تست',
                    text: 'سلام، امکان تغییر صندلی به کنار پنجره وجود دارد؟',
                    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                    id: 'msg-2',
                    author: 'ADMIN',
                    authorName: 'پشتیبانی',
                    text: 'درخواست شما دریافت شد و در حال بررسی است.',
                    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
                }
            ]
        };
    }
    async addMessage(userId, ticketId, messageText) {
        const ticket = await this.prisma.ticket.findUnique({ where: { id: ticketId } });
        if (!ticket) {
            throw new common_1.NotFoundException('تیکت یافت نشد');
        }
        if (ticket.userId !== userId) {
            throw new common_1.UnauthorizedException('شما مجاز به افزودن پیام به این تیکت نیستید');
        }
        const newMessage = await this.prisma.ticketMessage.create({
            data: {
                ticketId,
                authorId: userId,
                authorType: 'USER',
                text: messageText,
                timestamp: new Date(),
            },
        });
        const updatedTicket = await this.prisma.ticket.update({
            where: { id: ticketId },
            data: {
                status: 'WAITING_FOR_SUPPORT',
                updatedAt: new Date(),
            },
            include: {
                messages: {
                    orderBy: { timestamp: 'asc' }
                },
                user: {
                    select: {
                        id: true,
                        username: true,
                        name: true
                    }
                }
            },
        });
        const formattedTicket = {
            id: updatedTicket.id,
            subject: updatedTicket.subject,
            status: updatedTicket.status,
            priority: updatedTicket.priority,
            createdAt: updatedTicket.createdAt.toISOString(),
            updatedAt: updatedTicket.updatedAt.toISOString(),
            bookingId: updatedTicket.bookingId,
            user: updatedTicket.user,
            messages: updatedTicket.messages.map(msg => ({
                id: msg.id,
                author: msg.authorType,
                authorName: msg.authorType === 'USER' ? updatedTicket.user?.name || updatedTicket.user?.username : 'پشتیبانی',
                text: msg.text,
                timestamp: msg.timestamp.toISOString()
            }))
        };
        return {
            success: true,
            message: newMessage,
            ticketStatus: updatedTicket.status,
            ticket: formattedTicket,
        };
    }
    async addAdminMessage(adminId, ticketId, messageText) {
        const ticket = await this.prisma.ticket.findUnique({ where: { id: ticketId } });
        if (!ticket) {
            throw new common_1.NotFoundException('تیکت یافت نشد');
        }
        const newMessage = await this.prisma.ticketMessage.create({
            data: {
                ticketId,
                authorId: adminId,
                authorType: 'ADMIN',
                text: messageText,
                timestamp: new Date(),
            },
        });
        const updatedTicket = await this.prisma.ticket.update({
            where: { id: ticketId },
            data: {
                status: 'RESPONDED',
                updatedAt: new Date(),
            },
            include: {
                messages: {
                    orderBy: { timestamp: 'asc' }
                },
                user: {
                    select: {
                        id: true,
                        username: true,
                        name: true
                    }
                }
            },
        });
        return {
            id: updatedTicket.id,
            subject: updatedTicket.subject,
            status: updatedTicket.status,
            priority: updatedTicket.priority,
            createdAt: updatedTicket.createdAt.toISOString(),
            updatedAt: updatedTicket.updatedAt.toISOString(),
            bookingId: updatedTicket.bookingId,
            user: updatedTicket.user,
            messages: updatedTicket.messages.map(msg => ({
                id: msg.id,
                author: msg.authorType,
                authorName: msg.authorType === 'USER' ? updatedTicket.user?.name || updatedTicket.user?.username : 'پشتیبانی',
                text: msg.text,
                timestamp: msg.timestamp.toISOString()
            }))
        };
    }
    async markTicketAsInProgress(ticketId) {
        const ticket = await this.prisma.ticket.findUnique({ where: { id: ticketId } });
        if (!ticket) {
            throw new common_1.NotFoundException('تیکت یافت نشد');
        }
        const updatedTicket = await this.prisma.ticket.update({
            where: { id: ticketId },
            data: {
                status: 'IN_PROGRESS',
                updatedAt: new Date(),
            },
        });
        return updatedTicket;
    }
    async autoCloseOldTickets() {
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
        for (const ticket of oldTickets) {
            await this.prisma.ticket.update({
                where: { id: ticket.id },
                data: {
                    status: 'COMPLETED',
                    updatedAt: new Date(),
                },
            });
        }
        return { closedCount: oldTickets.length };
    }
    async closeTicket(userId, ticketId) {
        return {
            success: true,
            message: 'تیکت با موفقیت بسته شد'
        };
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TicketsService);
//# sourceMappingURL=tickets.service.js.map