export declare class CreateCommissionTransactionDto {
    tenantId: string;
    bookingId: string;
    totalAmount: number;
    agentCommission?: number;
    parentCommission?: number;
    netAmount?: number;
}
