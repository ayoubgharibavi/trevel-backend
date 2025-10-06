import { RefundsService } from './refunds.service';
declare class CreateRefundDto {
    bookingId: string;
    reason?: string;
}
declare class UpdateRefundDto {
    action: 'expert_approve' | 'financial_approve' | 'process_payment' | 'reject';
    reason?: string;
}
export declare class RefundsController {
    private readonly refundsService;
    constructor(refundsService: RefundsService);
    getUserRefunds(req: any): Promise<{
        id: string;
        bookingId: string;
        userId: string;
        requestDate: string;
        status: string;
        originalAmount: number;
        penaltyAmount: number;
        refundAmount: number;
        reason: string;
        currency: string;
    }[]>;
    requestRefund(req: any, body: CreateRefundDto): Promise<{
        success: boolean;
        refund: {
            id: string;
            bookingId: string;
            userId: string;
            requestDate: string;
            status: string;
            originalAmount: number;
            penaltyAmount: number;
            refundAmount: number;
            reason: string;
            currency: string;
        };
        message: string;
    }>;
    getAllRefunds(status?: string): Promise<{
        id: string;
        bookingId: string;
        user: {
            name: string;
            email: string;
        };
        requestDate: string;
        status: string;
        originalAmount: number;
        penaltyAmount: number;
        refundAmount: number;
        reason: string;
    }[]>;
    updateRefund(refundId: string, body: UpdateRefundDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getRefund(req: any, refundId: string): Promise<{
        id: string;
        bookingId: string;
        userId: string;
        requestDate: string;
        status: string;
        originalAmount: number;
        penaltyAmount: number;
        refundAmount: number;
        reason: string;
        currency: string;
        booking: {
            id: string;
            flight: {
                flightNumber: string;
                departure: {
                    city: string;
                    dateTime: string;
                };
                arrival: {
                    city: string;
                    dateTime: string;
                };
            };
        };
    }>;
}
export {};
