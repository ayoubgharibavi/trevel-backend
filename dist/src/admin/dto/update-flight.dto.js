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
exports.UpdateFlightDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateFlightDto {
}
exports.UpdateFlightDto = UpdateFlightDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'IR1234', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFlightDto.prototype, "flightNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ایران ایر', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFlightDto.prototype, "airline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Boeing 737', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFlightDto.prototype, "aircraft", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'اقتصادی', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFlightDto.prototype, "flightClass", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 180, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateFlightDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1500000, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateFlightDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateFlightDto.prototype, "taxes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateFlightDto.prototype, "availableSeats", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 150, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateFlightDto.prototype, "totalCapacity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'airport-1', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFlightDto.prototype, "departureAirportId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'airport-2', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFlightDto.prototype, "arrivalAirportId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-10-05T10:00:00Z', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFlightDto.prototype, "departureTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-10-05T13:00:00Z', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFlightDto.prototype, "arrivalTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ON_TIME', enum: ['ON_TIME', 'CLOSE', 'WAITING_FOR_COMMAND', 'NO_AVAILABILITY', 'CALL_US', 'CANCELLED'], required: false }),
    (0, class_validator_1.IsEnum)(['ON_TIME', 'CLOSE', 'WAITING_FOR_COMMAND', 'NO_AVAILABILITY', 'CALL_US', 'CANCELLED']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFlightDto.prototype, "status", void 0);
//# sourceMappingURL=update-flight.dto.js.map