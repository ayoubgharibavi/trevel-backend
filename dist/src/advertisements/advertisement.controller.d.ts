import { AdvertisementService } from './advertisement.service';
export declare class AdvertisementController {
    private readonly advertisementService;
    constructor(advertisementService: AdvertisementService);
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
