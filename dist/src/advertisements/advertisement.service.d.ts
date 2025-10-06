import { PrismaService } from '../prisma/prisma.service';
export declare class AdvertisementService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        success: boolean;
        data: never[];
        message: string;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: null;
        message: string;
    }>;
}
