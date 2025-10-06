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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SepehrBookingDto = exports.SepehrPaymentInfoDto = exports.SepehrContactInfoDto = exports.SepehrPassengerDto = exports.SepehrFlightSearchDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class SepehrFlightSearchDto {
}
exports.SepehrFlightSearchDto = SepehrFlightSearchDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SepehrFlightSearchDto.prototype, "departureCity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SepehrFlightSearchDto.prototype, "arrivalCity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SepehrFlightSearchDto.prototype, "departureDate", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SepehrFlightSearchDto.prototype, "adults", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SepehrFlightSearchDto.prototype, "children", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SepehrFlightSearchDto.prototype, "infants", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SepehrFlightSearchDto.prototype, "cabinClass", void 0);
class SepehrPassengerDto {
}
exports.SepehrPassengerDto = SepehrPassengerDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SepehrPassengerDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SepehrPassengerDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['male', 'female']),
    __metadata("design:type", String)
], SepehrPassengerDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SepehrPassengerDto.prototype, "birthDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SepehrPassengerDto.prototype, "nationality", void 0);
class SepehrContactInfoDto {
}
exports.SepehrContactInfoDto = SepehrContactInfoDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SepehrContactInfoDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SepehrContactInfoDto.prototype, "phone", void 0);
class SepehrPaymentInfoDto {
}
exports.SepehrPaymentInfoDto = SepehrPaymentInfoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SepehrPaymentInfoDto.prototype, "method", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SepehrPaymentInfoDto.prototype, "cardNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SepehrPaymentInfoDto.prototype, "expiryDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SepehrPaymentInfoDto.prototype, "cvv", void 0);
class SepehrBookingDto {
}
exports.SepehrBookingDto = SepehrBookingDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SepehrBookingDto.prototype, "flightId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SepehrPassengerDto),
    __metadata("design:type", Array)
], SepehrBookingDto.prototype, "passengers", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SepehrContactInfoDto),
    __metadata("design:type", SepehrContactInfoDto)
], SepehrBookingDto.prototype, "contactInfo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SepehrPaymentInfoDto),
    __metadata("design:type", SepehrPaymentInfoDto)
], SepehrBookingDto.prototype, "paymentInfo", void 0);
//# sourceMappingURL=sepehr.dto.js.map