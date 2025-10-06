export declare class ContentService {
    getHomeContent(language: string): Promise<{
        heroImageUrl: string;
        title: {
            fa: string;
            en: string;
            ar: string;
        };
        subtitle: {
            fa: string;
            en: string;
            ar: string;
        };
    }>;
    getAboutContent(language: string): Promise<{
        title: {
            fa: string;
            en: string;
            ar: string;
        };
        body: {
            fa: string;
            en: string;
            ar: string;
        };
        imageUrl: string;
    }>;
    getContactContent(language: string): Promise<{
        title: {
            fa: string;
            en: string;
            ar: string;
        };
        body: {
            fa: string;
            en: string;
            ar: string;
        };
        address: {
            fa: string;
            en: string;
            ar: string;
        };
        phone: string;
        email: string;
        mapImageUrl: string;
    }>;
    getFooterContent(language: string): Promise<{
        description: {
            fa: string;
            en: string;
            ar: string;
        };
        columns: {
            id: string;
            title: {
                fa: string;
                en: string;
                ar: string;
            };
            links: {
                id: string;
                text: {
                    fa: string;
                    en: string;
                    ar: string;
                };
                url: string;
            }[];
        }[];
    }>;
    getPopularDestinations(language: string): Promise<{
        title: {
            fa: string;
            en: string;
            ar: string;
        };
        subtitle: {
            fa: string;
            en: string;
            ar: string;
        };
        destinations: {
            id: string;
            name: {
                fa: string;
                en: string;
                ar: string;
            };
            imageUrl: string;
        }[];
    }>;
    getAdvertisements(placement?: string): Promise<{
        id: string;
        title: string;
        imageUrl: string;
        linkUrl: string;
        placement: string;
        isActive: boolean;
    }[]>;
}
