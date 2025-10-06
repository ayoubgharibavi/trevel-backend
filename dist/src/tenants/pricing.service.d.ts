import { PrismaService } from '../prisma/prisma.service';
export interface PricingCalculation {
    netPrice: number;
    grossPrice: number;
    commissionAmount: number;
    parentCommissionAmount: number;
    finalPrice: number;
}
export declare class PricingService {
    private prisma;
    constructor(prisma: PrismaService);
    calculateFinalPrice(tenantId: string, basePrice: number, source: 'sepehr' | 'charter118' | 'manual'): Promise<PricingCalculation>;
    private getEffectivePricingType;
    calculateCommissionForBooking(tenantId: string, bookingPrice: number, source: 'sepehr' | 'charter118' | 'manual'): Promise<{
        agentCommission: number;
        parentCommission: number;
        netAmount: number;
    }>;
}
