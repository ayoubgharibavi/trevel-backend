import { PrismaService } from '../prisma/prisma.service';
export declare class TicketCronService {
    private prisma;
    constructor(prisma: PrismaService);
    autoCloseOldTickets(): Promise<void>;
}
