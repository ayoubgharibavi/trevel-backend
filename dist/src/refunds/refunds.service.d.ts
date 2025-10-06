export declare class RefundsService {
    getUserRefunds(userId: string): Promise<{
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
    requestRefund(userId: string, data: {
        bookingId: string;
        reason?: string;
    }): Promise<{
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
    updateRefund(refundId: string, action: string, reason?: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getRefund(userId: string, refundId: string): Promise<{
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
