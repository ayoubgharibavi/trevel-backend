export declare class LoadingSettingsService {
    constructor();
    getSettings(): Promise<{
        success: boolean;
        data: {
            loadingTimeout: number;
            retryAttempts: number;
            cacheEnabled: boolean;
            cacheTimeout: number;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
        message?: undefined;
    }>;
    createSettings(createSettingsDto: any): Promise<{
        success: boolean;
        message: string;
        data: any;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        message?: undefined;
        data?: undefined;
    }>;
    updateSettings(id: string, updateSettingsDto: any): Promise<{
        success: boolean;
        message: string;
        data: any;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        message?: undefined;
        data?: undefined;
    }>;
}
