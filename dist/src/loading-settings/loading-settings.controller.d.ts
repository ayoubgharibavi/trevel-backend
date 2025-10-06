import { LoadingSettingsService } from './loading-settings.service';
export declare class LoadingSettingsController {
    private readonly loadingSettingsService;
    constructor(loadingSettingsService: LoadingSettingsService);
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
