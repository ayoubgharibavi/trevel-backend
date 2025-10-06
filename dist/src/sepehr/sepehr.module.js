"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SepehrModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const sepehr_controller_1 = require("./sepehr.controller");
const sepehr_api_service_1 = require("./sepehr-api.service");
const mock_booking_service_1 = require("./mock-booking.service");
let SepehrModule = class SepehrModule {
};
exports.SepehrModule = SepehrModule;
exports.SepehrModule = SepehrModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule.register({
                timeout: 10000,
                maxRedirects: 5,
            }),
            config_1.ConfigModule,
        ],
        controllers: [sepehr_controller_1.SepehrController],
        providers: [sepehr_api_service_1.SepehrApiService, mock_booking_service_1.MockBookingService],
        exports: [sepehr_api_service_1.SepehrApiService, mock_booking_service_1.MockBookingService],
    })
], SepehrModule);
//# sourceMappingURL=sepehr.module.js.map