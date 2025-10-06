import { TicketsService } from './tickets.service';
import { CreateTicketDto, AddMessageDto } from '../common/dto';
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    getTickets(req: any): Promise<{
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
    createTicket(req: any, body: CreateTicketDto): Promise<{
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
    getTicket(req: any, ticketId: string): Promise<{
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
    addMessage(req: any, ticketId: string, body: AddMessageDto): Promise<{
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
    addAdminMessage(req: any, ticketId: string, body: AddMessageDto): Promise<{
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
    closeTicket(req: any, ticketId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
