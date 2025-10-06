import { PrismaService } from '../prisma/prisma.service';
export declare class TicketsService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserTickets(userId: string): Promise<{
        id: string;
        subject: string;
        status: import(".prisma/client").$Enums.TicketStatus;
        priority: string;
        createdAt: string;
        updatedAt: string;
        bookingId: string | null;
        user: {
            id: string;
            name: string;
            username: string;
        };
        messages: {
            id: string;
            author: "USER" | "ADMIN";
            authorName: string;
            text: string;
            timestamp: string;
        }[];
    }[]>;
    createTicket(userId: string, data: {
        subject: string;
        message: string;
        bookingId?: string;
        priority?: string;
    }): Promise<{
        success: boolean;
        ticket: {
            user: {
                id: string;
                name: string;
                username: string;
            };
            messages: {
                id: string;
                timestamp: Date;
                ticketId: string;
                authorId: string;
                authorType: string;
                text: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.TicketStatus;
            userId: string;
            priority: string;
            subject: string;
            bookingId: string | null;
        };
        message: string;
    }>;
    getTicket(userId: string, ticketId: string): Promise<{
        id: string;
        userId: string;
        subject: string;
        status: string;
        priority: string;
        createdAt: string;
        updatedAt: string;
        bookingId: string;
        messages: {
            id: string;
            author: string;
            authorName: string;
            text: string;
            timestamp: string;
        }[];
    }>;
    addMessage(userId: string, ticketId: string, messageText: string): Promise<{
        success: boolean;
        message: {
            id: string;
            timestamp: Date;
            ticketId: string;
            authorId: string;
            authorType: string;
            text: string;
        };
        ticketStatus: import(".prisma/client").$Enums.TicketStatus;
        ticket: {
            id: string;
            subject: string;
            status: import(".prisma/client").$Enums.TicketStatus;
            priority: string;
            createdAt: string;
            updatedAt: string;
            bookingId: string | null;
            user: {
                id: string;
                name: string;
                username: string;
            };
            messages: {
                id: string;
                author: "USER" | "ADMIN";
                authorName: string;
                text: string;
                timestamp: string;
            }[];
        };
    }>;
    addAdminMessage(adminId: string, ticketId: string, messageText: string): Promise<{
        id: string;
        subject: string;
        status: import(".prisma/client").$Enums.TicketStatus;
        priority: string;
        createdAt: string;
        updatedAt: string;
        bookingId: string | null;
        user: {
            id: string;
            name: string;
            username: string;
        };
        messages: {
            id: string;
            author: "USER" | "ADMIN";
            authorName: string;
            text: string;
            timestamp: string;
        }[];
    }>;
    markTicketAsInProgress(ticketId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.TicketStatus;
        userId: string;
        priority: string;
        subject: string;
        bookingId: string | null;
    }>;
    autoCloseOldTickets(): Promise<{
        closedCount: number;
    }>;
    closeTicket(userId: string, ticketId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
