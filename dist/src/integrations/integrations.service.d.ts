export declare class IntegrationsService {
    getTelegramConfig(): Promise<{
        isEnabled: boolean;
        botToken: string;
        chatId: string;
        notifyOn: {
            newBooking: boolean;
            bookingCancellation: boolean;
            refundUpdate: boolean;
            newUser: boolean;
            newTicket: boolean;
        };
    }>;
    updateTelegramConfig(config: any): Promise<{
        success: boolean;
        message: string;
    }>;
    testTelegramMessage(message: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getWhatsAppConfig(): Promise<{
        isEnabled: boolean;
        apiKey: string;
        phoneNumberId: string;
        notifyOn: {
            bookingSuccess: boolean;
            flightChange: boolean;
        };
    }>;
    updateWhatsAppConfig(config: any): Promise<{
        success: boolean;
        message: string;
    }>;
    testWhatsAppMessage(message: string, phoneNumber: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
