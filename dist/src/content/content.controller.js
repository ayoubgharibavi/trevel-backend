"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const content_service_1 = require("./content.service");
const public_decorator_1 = require("../auth/decorators/public.decorator");
let ContentController = class ContentController {
    constructor(contentService) {
        this.contentService = contentService;
    }
    async getHomeContent(language = 'fa') {
        return this.contentService.getHomeContent(language);
    }
    async getAboutContent(language = 'fa') {
        return this.contentService.getAboutContent(language);
    }
    async getContactContent(language = 'fa') {
        return this.contentService.getContactContent(language);
    }
    async getFooterContent(language = 'fa') {
        return this.contentService.getFooterContent(language);
    }
    async getPopularDestinations(language = 'fa') {
        return this.contentService.getPopularDestinations(language);
    }
    async getAdvertisements(placement) {
        return this.contentService.getAdvertisements(placement);
    }
};
exports.ContentController = ContentController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('home'),
    (0, swagger_1.ApiOperation)({ summary: 'Get home page content' }),
    (0, swagger_1.ApiQuery)({ name: 'language', required: false }),
    __param(0, (0, common_1.Query)('language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getHomeContent", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('about'),
    (0, swagger_1.ApiOperation)({ summary: 'Get about page content' }),
    (0, swagger_1.ApiQuery)({ name: 'language', required: false }),
    __param(0, (0, common_1.Query)('language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getAboutContent", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('contact'),
    (0, swagger_1.ApiOperation)({ summary: 'Get contact page content' }),
    (0, swagger_1.ApiQuery)({ name: 'language', required: false }),
    __param(0, (0, common_1.Query)('language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getContactContent", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('footer'),
    (0, swagger_1.ApiOperation)({ summary: 'Get footer content' }),
    (0, swagger_1.ApiQuery)({ name: 'language', required: false }),
    __param(0, (0, common_1.Query)('language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getFooterContent", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('popular-destinations'),
    (0, swagger_1.ApiOperation)({ summary: 'Get popular destinations for home page' }),
    (0, swagger_1.ApiQuery)({ name: 'language', required: false }),
    __param(0, (0, common_1.Query)('language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getPopularDestinations", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('advertisements'),
    (0, swagger_1.ApiOperation)({ summary: 'Get active advertisements' }),
    (0, swagger_1.ApiQuery)({ name: 'placement', required: false }),
    __param(0, (0, common_1.Query)('placement')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getAdvertisements", null);
exports.ContentController = ContentController = __decorate([
    (0, swagger_1.ApiTags)('content'),
    (0, common_1.Controller)({ path: 'content', version: '1' }),
    __metadata("design:paramtypes", [content_service_1.ContentService])
], ContentController);
//# sourceMappingURL=content.controller.js.map