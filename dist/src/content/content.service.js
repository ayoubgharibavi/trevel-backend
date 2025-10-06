"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
let ContentService = class ContentService {
    async getHomeContent(language) {
        return {
            heroImageUrl: '/assets/hero-bg.jpg',
            title: {
                fa: 'پرواز هوشمند - رزرو آسان بلیط هواپیما',
                en: 'Smart Flight - Easy Airline Ticket Booking',
                ar: 'الطيران الذكي - حجز تذاكر الطيران بسهولة'
            },
            subtitle: {
                fa: 'بهترین قیمت‌ها را با هوش مصنوعی پیدا کنید',
                en: 'Find the best prices with artificial intelligence',
                ar: 'اعثر على أفضل الأسعار بالذكاء الاصطناعي'
            }
        };
    }
    async getAboutContent(language) {
        return {
            title: {
                fa: 'درباره ما',
                en: 'About Us',
                ar: 'معلومات عنا'
            },
            body: {
                fa: 'پرواز هوشمند یک پلتفرم پیشرو برای رزرو بلیط هواپیما است که با استفاده از هوش مصنوعی، بهترین گزینه‌ها را به شما پیشنهاد می‌دهد.',
                en: 'Smart Flight is a leading platform for booking airline tickets, using artificial intelligence to suggest the best options for you.',
                ar: 'الطيران الذكي هي منصة رائدة لحجز تذاكر الطيران تستخدم الذكاء الاصطناعي لتقديم أفضل الخيارات لك.'
            },
            imageUrl: '/assets/about-us.jpg'
        };
    }
    async getContactContent(language) {
        return {
            title: {
                fa: 'تماس با ما',
                en: 'Contact Us',
                ar: 'اتصل بنا'
            },
            body: {
                fa: 'ما همیشه آماده پاسخگویی به سوالات شما هستیم.',
                en: 'We are always ready to answer your questions.',
                ar: 'نحن دائما على استعداد للإجابة على أسئلتك.'
            },
            address: {
                fa: 'تهران، خیابان آزادی، پلاک ۱۲۳',
                en: 'Tehran, Azadi St, No. 123',
                ar: 'طهران، شارع آزادي، رقم 123'
            },
            phone: '+98 21 1234 5678',
            email: 'support@smartflight.com',
            mapImageUrl: '/assets/map.jpg'
        };
    }
    async getFooterContent(language) {
        return {
            description: {
                fa: 'یک پلتفرم مدرن برای رزرو بلیط هواپیما، طراحی شده برای ارائه بهترین تجربه کاربری',
                en: 'A modern platform for booking airline tickets, designed to provide the best user experience',
                ar: 'منصة حديثة لحجز تذاكر الطيران، مصممة لتقديم أفضل تجربة مستخدم'
            },
            columns: [
                {
                    id: 'col-1',
                    title: {
                        fa: 'لینک‌های سریع',
                        en: 'Quick Links',
                        ar: 'روابط سريعة'
                    },
                    links: [
                        { id: 'link-1', text: { fa: 'درباره ما', en: 'About Us', ar: 'معلومات عنا' }, url: '/about' },
                        { id: 'link-2', text: { fa: 'تماس با ما', en: 'Contact Us', ar: 'اتصل بنا' }, url: '/contact' },
                        { id: 'link-3', text: { fa: 'سوالات متداول', en: 'FAQ', ar: 'الأسئلة الشائعة' }, url: '/faq' }
                    ]
                }
            ]
        };
    }
    async getPopularDestinations(language) {
        return {
            title: {
                fa: 'مقصدهای محبوب',
                en: 'Popular Destinations',
                ar: 'وجهات شهيرة'
            },
            subtitle: {
                fa: 'مکان‌هایی را که مشتریان ما دوست دارند به آنجا سفر کنند، کشف کنید.',
                en: 'Discover places our customers love to travel to.',
                ar: 'اكتشف الأماكن التي يحب عملاؤنا السفر إليها.'
            },
            destinations: [
                { id: 'dest-1', name: { fa: 'استانبول', en: 'Istanbul', ar: 'إسطنبول' }, imageUrl: '/assets/destinations/istanbul.jpg' },
                { id: 'dest-2', name: { fa: 'دبی', en: 'Dubai', ar: 'دبي' }, imageUrl: '/assets/destinations/dubai.jpg' },
                { id: 'dest-3', name: { fa: 'پاریس', en: 'Paris', ar: 'باريس' }, imageUrl: '/assets/destinations/paris.jpg' },
                { id: 'dest-4', name: { fa: 'تهران', en: 'Tehran', ar: 'طهران' }, imageUrl: '/assets/destinations/tehran.jpg' }
            ]
        };
    }
    async getAdvertisements(placement) {
        const ads = [
            {
                id: 'ad-1',
                title: 'Summer Sale Banner',
                imageUrl: '/assets/ads/summer-sale.jpg',
                linkUrl: '/special-offers',
                placement: 'SEARCH_RESULTS_TOP',
                isActive: true
            },
            {
                id: 'ad-2',
                title: 'Hotel Deals Sidebar',
                imageUrl: '/assets/ads/hotel-deals.jpg',
                linkUrl: '/hotels',
                placement: 'SIDEBAR_BOTTOM',
                isActive: true
            }
        ];
        return placement ? ads.filter(ad => ad.placement === placement && ad.isActive) : ads.filter(ad => ad.isActive);
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)()
], ContentService);
//# sourceMappingURL=content.service.js.map