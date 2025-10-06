export declare class UpdateUserDto {
    name?: string;
    role?: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
    status?: 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'SUSPENDED';
    canBypassRateLimit?: boolean;
    displayCurrencies?: string[];
    tenantId?: string;
}
