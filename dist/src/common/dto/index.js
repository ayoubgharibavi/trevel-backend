"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAdvertisementDto = exports.CreateAdvertisementDto = exports.UpdateFlightDto = exports.CreateFlightDto = exports.FlightSearchQueryDto = exports.UpdateUserDto = exports.AddMessageDto = exports.CreateTicketDto = exports.CancelBookingDto = exports.CreateBookingDto = exports.PassengerDto = exports.SavedPassengerDto = exports.UpdateProfileDto = exports.SignupDto = exports.UpdateExchangeRateDto = exports.CreateExchangeRateDto = exports.LoginDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var login_dto_1 = require("./login.dto");
Object.defineProperty(exports, "LoginDto", { enumerable: true, get: function () { return login_dto_1.LoginDto; } });
class CreateExchangeRateDto {
}
exports.CreateExchangeRateDto = CreateExchangeRateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'شناسه ارز مبدأ' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateExchangeRateDto.prototype, "baseCurrencyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'شناسه ارز مقصد' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateExchangeRateDto.prototype, "targetCurrencyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1.5, description: 'نرخ تبدیل' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateExchangeRateDto.prototype, "rate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MANUAL', description: 'منبع نرخ تبدیل', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateExchangeRateDto.prototype, "source", void 0);
class UpdateExchangeRateDto {
}
exports.UpdateExchangeRateDto = UpdateExchangeRateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1.5, description: 'نرخ تبدیل' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateExchangeRateDto.prototype, "rate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MANUAL', description: 'منبع نرخ تبدیل', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateExchangeRateDto.prototype, "source", void 0);
class SignupDto {
}
exports.SignupDto = SignupDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'احمد محمدی' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignupDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ahmad123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignupDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ahmad@example.com' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignupDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], SignupDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+989123456789' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignupDto.prototype, "phone", void 0);
class UpdateProfileDto {
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "currentPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "newPassword", void 0);
class SavedPassengerDto {
}
exports.SavedPassengerDto = SavedPassengerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'احمد' }),
    __metadata("design:type", String)
], SavedPassengerDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'محمدی' }),
    __metadata("design:type", String)
], SavedPassengerDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Iranian' }),
    __metadata("design:type", String)
], SavedPassengerDto.prototype, "nationality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Male' }),
    __metadata("design:type", String)
], SavedPassengerDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SavedPassengerDto.prototype, "nationalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SavedPassengerDto.prototype, "passportNumber", void 0);
class PassengerDto {
}
exports.PassengerDto = PassengerDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PassengerDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PassengerDto.prototype, "seatNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PassengerDto.prototype, "ticketNumber", void 0);
class CreateBookingDto {
}
exports.CreateBookingDto = CreateBookingDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "flightId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PassengerDto),
    __metadata("design:type", Array)
], CreateBookingDto.prototype, "passengers", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateBookingDto.prototype, "totalPrice", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "contactEmail", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "contactPhone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "buyerReference", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateBookingDto.prototype, "purchasePrice", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "searchQuery", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "sepehrBookingId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "sepehrPnr", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "charter118BookingId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "charter118ConfirmationCode", void 0);
class CancelBookingDto {
}
exports.CancelBookingDto = CancelBookingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CancelBookingDto.prototype, "reason", void 0);
class CreateTicketDto {
}
exports.CreateTicketDto = CreateTicketDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'درخواست تغییر صندلی' }),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'سلام، امکان تغییر صندلی وجود دارد؟' }),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "bookingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: ['LOW', 'MEDIUM', 'HIGH'] }),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "priority", void 0);
class AddMessageDto {
}
exports.AddMessageDto = AddMessageDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AddMessageDto.prototype, "message", void 0);
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "status", void 0);
class FlightSearchQueryDto {
}
exports.FlightSearchQueryDto = FlightSearchQueryDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FlightSearchQueryDto.prototype, "from", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FlightSearchQueryDto.prototype, "to", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FlightSearchQueryDto.prototype, "departureDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FlightSearchQueryDto.prototype, "adults", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FlightSearchQueryDto.prototype, "children", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FlightSearchQueryDto.prototype, "infants", void 0);
class FlightLocationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clmey6sjo6d000fumywum4qyl', description: 'شناسه فرودگاه', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FlightLocationDto.prototype, "airportId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'تهران', description: 'نام شهر', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FlightLocationDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'IKA', description: 'کد IATA فرودگاه', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FlightLocationDto.prototype, "airportCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Terminal 1', description: 'ترمینال', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FlightLocationDto.prototype, "terminal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-01-01T08:00:00Z', description: 'زمان پرواز برنامه ریزی شده', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FlightLocationDto.prototype, "scheduledTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A1', description: 'گیت', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FlightLocationDto.prototype, "gate", void 0);
class FlightAllotmentDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Economy', description: 'کلاس پروازی', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FlightAllotmentDto.prototype, "flightClass", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'تعداد صندلی ها', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined)
            return value;
        if (typeof value === 'string') {
            const parsed = parseInt(value, 10);
            return isNaN(parsed) ? 0 : parsed;
        }
        if (typeof value === 'number')
            return value;
        return 0;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'seats must be a valid number' }),
    __metadata("design:type", Number)
], FlightAllotmentDto.prototype, "seats", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5000000, description: 'قیمت هر صندلی', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined)
            return value;
        if (typeof value === 'string') {
            const parsed = parseInt(value, 10);
            return isNaN(parsed) ? 0 : parsed;
        }
        if (typeof value === 'number')
            return value;
        return 0;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'price must be a valid number' }),
    __metadata("design:type", Number)
], FlightAllotmentDto.prototype, "price", void 0);
class CreateFlightDto {
}
exports.CreateFlightDto = CreateFlightDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Iran Air', description: 'نام ایرلاین' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFlightDto.prototype, "airline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/logo.png', description: 'لگوی ایرلاین', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFlightDto.prototype, "airlineLogoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'IR-452', description: 'شماره پرواز' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFlightDto.prototype, "flightNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: FlightLocationDto, description: 'اطلاعات پرواز مبدأ' }),
    (0, class_transformer_1.Type)(() => FlightLocationDto),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", FlightLocationDto)
], CreateFlightDto.prototype, "departure", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: FlightLocationDto, description: 'اطلاعات پرواز مقصد' }),
    (0, class_transformer_1.Type)(() => FlightLocationDto),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", FlightLocationDto)
], CreateFlightDto.prototype, "arrival", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 120, description: 'مدت زمان پرواز به دقیقه', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined)
            return value;
        if (typeof value === 'string') {
            const parsed = parseInt(value, 10);
            return isNaN(parsed) ? 0 : parsed;
        }
        if (typeof value === 'number')
            return value;
        return 0;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'duration must be a valid number' }),
    __metadata("design:type", Number)
], CreateFlightDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, description: 'تعداد توقف ها', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined)
            return value;
        if (typeof value === 'string') {
            const parsed = parseInt(value, 10);
            return isNaN(parsed) ? 0 : parsed;
        }
        if (typeof value === 'number')
            return value;
        return 0;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'stops must be a valid number' }),
    __metadata("design:type", Number)
], CreateFlightDto.prototype, "stops", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10000000, description: 'قیمت پایه بلیط' }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined)
            return value;
        if (typeof value === 'string') {
            const parsed = parseInt(value, 10);
            return isNaN(parsed) ? 0 : parsed;
        }
        if (typeof value === 'number')
            return value;
        return 0;
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateFlightDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, description: 'مالیات بلیط', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined)
            return 0;
        if (typeof value === 'string') {
            const parsed = parseInt(value, 10);
            return isNaN(parsed) ? 0 : parsed;
        }
        if (typeof value === 'number')
            return value;
        return 0;
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFlightDto.prototype, "taxes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Economy', description: 'کلاس پروازی' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFlightDto.prototype, "flightClass", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A320', description: 'نوع هواپیما' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFlightDto.prototype, "aircraft", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 150, description: 'تعداد صندلی های موجود', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined)
            return value;
        if (typeof value === 'string') {
            const parsed = parseInt(value, 10);
            return isNaN(parsed) ? 0 : parsed;
        }
        if (typeof value === 'number')
            return value;
        return 0;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'availableSeats must be a valid number' }),
    __metadata("design:type", Number)
], CreateFlightDto.prototype, "availableSeats", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 180, description: 'ظرفیت کل هواپیما', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined)
            return value;
        if (typeof value === 'string') {
            const parsed = parseInt(value, 10);
            return isNaN(parsed) ? 0 : parsed;
        }
        if (typeof value === 'number')
            return value;
        return 0;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'totalCapacity must be a valid number' }),
    __metadata("design:type", Number)
], CreateFlightDto.prototype, "totalCapacity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '20kg', description: 'میزان بار مجاز', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFlightDto.prototype, "baggageAllowance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ON_TIME', description: 'وضعیت پرواز', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFlightDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'تعداد ساعات قبل از پرواز برای بستن رزرو', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateFlightDto.prototype, "bookingClosesBeforeDepartureHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MANUAL', description: 'نوع منبع یابی پرواز (Manual, API)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFlightDto.prototype, "sourcingType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'شناسه مدل کمیسیون', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFlightDto.prototype, "commissionModelId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'شناسه سیاست بازپرداخت', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFlightDto.prototype, "refundPolicyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [FlightAllotmentDto], description: 'تخصیص صندلی ها', required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => FlightAllotmentDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateFlightDto.prototype, "allotments", void 0);
class UpdateFlightDto {
}
exports.UpdateFlightDto = UpdateFlightDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Iran Air', description: 'نام ایرلاین', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFlightDto.prototype, "airline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/logo.png', description: 'لگوی ایرلاین', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFlightDto.prototype, "airlineLogoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'IR-452', description: 'شماره پرواز', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFlightDto.prototype, "flightNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: FlightLocationDto, description: 'اطلاعات پرواز مبدأ', required: false }),
    (0, class_transformer_1.Type)(() => FlightLocationDto),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", FlightLocationDto)
], UpdateFlightDto.prototype, "departure", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: FlightLocationDto, description: 'اطلاعات پرواز مقصد', required: false }),
    (0, class_transformer_1.Type)(() => FlightLocationDto),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", FlightLocationDto)
], UpdateFlightDto.prototype, "arrival", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 120, description: 'مدت زمان پرواز به دقیقه', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined)
            return value;
        if (typeof value === 'string') {
            const parsed = parseInt(value, 10);
            return isNaN(parsed) ? 0 : parsed;
        }
        if (typeof value === 'number')
            return value;
        return 0;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'duration must be a valid number' }),
    __metadata("design:type", Number)
], UpdateFlightDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, description: 'تعداد توقف ها', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined)
            return value;
        if (typeof value === 'string') {
            const parsed = parseInt(value, 10);
            return isNaN(parsed) ? 0 : parsed;
        }
        if (typeof value === 'number')
            return value;
        return 0;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'stops must be a valid number' }),
    __metadata("design:type", Number)
], UpdateFlightDto.prototype, "stops", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10000000, description: 'قیمت پایه بلیط', required: false }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined)
            return value;
        if (typeof value === 'string') {
            const parsed = parseInt(value, 10);
            return isNaN(parsed) ? 0 : parsed;
        }
        if (typeof value === 'number')
            return value;
        return 0;
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateFlightDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000000, description: 'مالیات بلیط', required: false }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined)
            return value;
        if (typeof value === 'string') {
            const parsed = parseInt(value, 10);
            return isNaN(parsed) ? 0 : parsed;
        }
        if (typeof value === 'number')
            return value;
        return 0;
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateFlightDto.prototype, "taxes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Economy', description: 'کلاس پروازی', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFlightDto.prototype, "flightClass", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A320', description: 'نوع هواپیما', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFlightDto.prototype, "aircraft", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 150, description: 'تعداد صندلی های موجود', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined)
            return value;
        if (typeof value === 'string') {
            const parsed = parseInt(value, 10);
            return isNaN(parsed) ? 0 : parsed;
        }
        if (typeof value === 'number')
            return value;
        return 0;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'availableSeats must be a valid number' }),
    __metadata("design:type", Number)
], UpdateFlightDto.prototype, "availableSeats", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 180, description: 'ظرفیت کل هواپیما', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined)
            return value;
        if (typeof value === 'string') {
            const parsed = parseInt(value, 10);
            return isNaN(parsed) ? 0 : parsed;
        }
        if (typeof value === 'number')
            return value;
        return 0;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'totalCapacity must be a valid number' }),
    __metadata("design:type", Number)
], UpdateFlightDto.prototype, "totalCapacity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '20kg', description: 'میزان بار مجاز', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFlightDto.prototype, "baggageAllowance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ON_TIME', description: 'وضعیت پرواز', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFlightDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'تعداد ساعات قبل از پرواز برای بستن رزرو', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateFlightDto.prototype, "bookingClosesBeforeDepartureHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MANUAL', description: 'نوع منبع یابی پرواز (Manual, API)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFlightDto.prototype, "sourcingType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'شناسه مدل کمیسیون', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFlightDto.prototype, "commissionModelId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'شناسه سیاست بازپرداخت', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFlightDto.prototype, "refundPolicyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [FlightAllotmentDto], description: 'تخصیص صندلی ها', required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => FlightAllotmentDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateFlightDto.prototype, "allotments", void 0);
__exportStar(require("./flight.dto"), exports);
__exportStar(require("./login.dto"), exports);
__exportStar(require("./update-user.dto"), exports);
__exportStar(require("./wallet.dto"), exports);
__exportStar(require("./refresh.dto"), exports);
__exportStar(require("./sepehr.dto"), exports);
class CreateAdvertisementDto {
}
exports.CreateAdvertisementDto = CreateAdvertisementDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'تبلیغ پرواز تهران-مشهد' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAdvertisementDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'پروازهای ارزان قیمت تهران به مشهد' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAdvertisementDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/ad.jpg' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAdvertisementDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/landing' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAdvertisementDto.prototype, "linkUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '#FF5733' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAdvertisementDto.prototype, "backgroundColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '#FFFFFF' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAdvertisementDto.prototype, "textColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'flight-results' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAdvertisementDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateAdvertisementDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateAdvertisementDto.prototype, "isActive", void 0);
class UpdateAdvertisementDto {
}
exports.UpdateAdvertisementDto = UpdateAdvertisementDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'تبلیغ پرواز تهران-مشهد' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAdvertisementDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'پروازهای ارزان قیمت تهران به مشهد' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAdvertisementDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/ad.jpg' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAdvertisementDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/landing' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAdvertisementDto.prototype, "linkUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '#FF5733' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAdvertisementDto.prototype, "backgroundColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '#FFFFFF' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAdvertisementDto.prototype, "textColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'flight-results' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAdvertisementDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateAdvertisementDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateAdvertisementDto.prototype, "isActive", void 0);
//# sourceMappingURL=index.js.map