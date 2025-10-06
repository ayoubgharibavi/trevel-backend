export declare class ApiManagementService {
    constructor();
    getAllApis(): Promise<{
        success: boolean;
        data: {
            id: string;
            name: string;
            displayName: string;
            baseUrl: string;
            isActive: boolean;
            isEnabled: boolean;
            balance: number;
            currency: string;
            status: string;
            lastCheck: string;
            createdAt: string;
            updatedAt: string;
        }[];
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    createApi(createApiDto: any): Promise<{
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
    updateApi(id: string, updateApiDto: any): Promise<{
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
    toggleApiStatus(id: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            status: string;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        message?: undefined;
        data?: undefined;
    }>;
    toggleApiEnabled(id: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            enabled: string;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        message?: undefined;
        data?: undefined;
    }>;
    testApiConnection(id: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            connection: string;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        message?: undefined;
        data?: undefined;
    }>;
    getApiBalance(id: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            balance: number;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        message?: undefined;
        data?: undefined;
    }>;
    updateAllStatuses(): Promise<{
        success: boolean;
        message: string;
        data: {
            updated: boolean;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        message?: undefined;
        data?: undefined;
    }>;
    updateAllBalances(): Promise<{
        success: boolean;
        message: string;
        data: {
            updated: boolean;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        message?: undefined;
        data?: undefined;
    }>;
}
