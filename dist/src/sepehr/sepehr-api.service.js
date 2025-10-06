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
var SepehrApiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SepehrApiService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
let SepehrApiService = SepehrApiService_1 = class SepehrApiService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.logger = new common_1.Logger(SepehrApiService_1.name);
        this.baseUrl = this.configService.get('SEPEHR_API_BASE_URL') || 'https://api.sepehrsupport.ir';
        this.apiKey = this.configService.get('SEPEHR_API_KEY') || '';
        this.apiSecret = this.configService.get('SEPEHR_API_SECRET') || '';
    }
    async searchFlights(request) {
        this.logger.log(`🔍 Searching flights: ${request.departureCity} → ${request.arrivalCity}`);
        try {
            const mockResponse = {
                success: true,
                data: {
                    flights: [
                        {
                            id: 'sepehr-001',
                            flightNumber: 'SP001',
                            airline: {
                                code: 'SP',
                                name: { fa: 'سپهر', en: 'Sepehr' },
                                logo: 'https://example.com/sepehr-logo.png'
                            },
                            aircraft: {
                                code: 'A320',
                                name: { fa: 'ایرباس A320', en: 'Airbus A320' }
                            },
                            flightClass: {
                                code: 'Y',
                                name: { fa: 'اکونومی', en: 'Economy' }
                            },
                            departure: {
                                airport: {
                                    code: request.departureCity,
                                    name: { fa: 'فرودگاه مبدا', en: 'Departure Airport' },
                                    city: { fa: 'شهر مبدا', en: 'Departure City' }
                                },
                                dateTime: new Date(request.departureDate).toISOString(),
                                terminal: 'T1',
                                gate: 'A1'
                            },
                            arrival: {
                                airport: {
                                    code: request.arrivalCity,
                                    name: { fa: 'فرودگاه مقصد', en: 'Arrival Airport' },
                                    city: { fa: 'شهر مقصد', en: 'Arrival City' }
                                },
                                dateTime: new Date(new Date(request.departureDate).getTime() + 2 * 60 * 60 * 1000).toISOString(),
                                terminal: 'T2',
                                gate: 'B1'
                            },
                            price: {
                                adult: 1500000,
                                child: 1200000,
                                infant: 0,
                                currency: 'IRR'
                            },
                            availableSeats: 120,
                            baggage: {
                                weight: 20,
                                unit: 'kg'
                            },
                            duration: 120,
                            stops: 0
                        }
                    ],
                    totalCount: 1,
                    searchId: 'sepehr-search-001'
                },
                message: 'Flights found successfully'
            };
            this.logger.log(`✅ Found ${mockResponse.data.flights.length} flights`);
            return mockResponse;
        }
        catch (error) {
            this.logger.error(`❌ Flight search failed: ${error.message}`);
            throw new Error(`Sepehr API error: ${error.message}`);
        }
    }
    async getFlightDetails(flightId) {
        this.logger.log(`🔍 Getting flight details: ${flightId}`);
        try {
            const mockResponse = {
                success: true,
                data: {
                    flight: {
                        id: flightId,
                        flightNumber: 'SP001',
                        airline: {
                            code: 'SP',
                            name: { fa: 'سپهر', en: 'Sepehr' },
                            logo: 'https://example.com/sepehr-logo.png'
                        },
                        aircraft: {
                            code: 'A320',
                            name: { fa: 'ایرباس A320', en: 'Airbus A320' }
                        },
                        flightClass: {
                            code: 'Y',
                            name: { fa: 'اکونومی', en: 'Economy' }
                        },
                        departure: {
                            airport: {
                                code: 'THR',
                                name: { fa: 'فرودگاه امام خمینی', en: 'Imam Khomeini Airport' },
                                city: { fa: 'تهران', en: 'Tehran' }
                            },
                            dateTime: new Date().toISOString(),
                            terminal: 'T1',
                            gate: 'A1'
                        },
                        arrival: {
                            airport: {
                                code: 'MHD',
                                name: { fa: 'فرودگاه مشهد', en: 'Mashhad Airport' },
                                city: { fa: 'مشهد', en: 'Mashhad' }
                            },
                            dateTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
                            terminal: 'T2',
                            gate: 'B1'
                        },
                        price: {
                            adult: 1500000,
                            child: 1200000,
                            infant: 0,
                            currency: 'IRR'
                        },
                        availableSeats: 120,
                        baggage: {
                            weight: 20,
                            unit: 'kg'
                        },
                        duration: 120,
                        stops: 0,
                        amenities: ['WiFi', 'Meal', 'Entertainment'],
                        policies: {
                            cancellation: '24 hours before departure',
                            changes: 'Allowed with fee',
                            refund: 'Partial refund available'
                        }
                    }
                },
                message: 'Flight details retrieved successfully'
            };
            this.logger.log(`✅ Flight details retrieved: ${flightId}`);
            return mockResponse;
        }
        catch (error) {
            this.logger.error(`❌ Get flight details failed: ${error.message}`);
            throw new Error(`Sepehr API error: ${error.message}`);
        }
    }
    async bookFlight(bookingRequest) {
        this.logger.log(`🔍 Booking flight: ${bookingRequest.flightId}`);
        try {
            const mockResponse = {
                success: true,
                data: {
                    bookingId: `sepehr-booking-${Date.now()}`,
                    pnr: `SP${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
                    status: 'CONFIRMED',
                    passengers: bookingRequest.passengers.map((passenger, index) => ({
                        id: `passenger-${index + 1}`,
                        name: passenger.name,
                        seatNumber: `A${index + 1}`,
                        ticketNumber: `TK${Date.now()}${index + 1}`
                    })),
                    flight: {
                        id: bookingRequest.flightId,
                        flightNumber: 'SP001',
                        departure: {
                            dateTime: new Date().toISOString(),
                            airport: {
                                code: 'THR',
                                name: { fa: 'فرودگاه امام خمینی', en: 'Imam Khomeini Airport' }
                            }
                        },
                        arrival: {
                            dateTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
                            airport: {
                                code: 'MHD',
                                name: { fa: 'فرودگاه مشهد', en: 'Mashhad Airport' }
                            }
                        }
                    },
                    totalPrice: bookingRequest.passengers.length * 1500000,
                    currency: 'IRR',
                    paymentStatus: 'PENDING',
                    bookingDate: new Date().toISOString()
                },
                message: 'Flight booked successfully'
            };
            this.logger.log(`✅ Flight booked: ${mockResponse.data.bookingId}`);
            return mockResponse;
        }
        catch (error) {
            this.logger.error(`❌ Flight booking failed: ${error.message}`);
            throw new Error(`Sepehr API error: ${error.message}`);
        }
    }
    async cancelBooking(bookingId) {
        this.logger.log(`🔍 Cancelling booking: ${bookingId}`);
        try {
            const mockResponse = {
                success: true,
                data: {
                    bookingId,
                    status: 'CANCELLED',
                    refundAmount: 1200000,
                    currency: 'IRR',
                    cancellationDate: new Date().toISOString()
                },
                message: 'Booking cancelled successfully'
            };
            this.logger.log(`✅ Booking cancelled: ${bookingId}`);
            return mockResponse;
        }
        catch (error) {
            this.logger.error(`❌ Booking cancellation failed: ${error.message}`);
            throw new Error(`Sepehr API error: ${error.message}`);
        }
    }
    async getBookingStatus(bookingId) {
        this.logger.log(`🔍 Getting booking status: ${bookingId}`);
        try {
            const mockResponse = {
                success: true,
                data: {
                    bookingId,
                    status: 'CONFIRMED',
                    pnr: `SP${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
                    passengers: [
                        {
                            id: 'passenger-1',
                            name: 'John Doe',
                            seatNumber: 'A1',
                            ticketNumber: 'TK123456'
                        }
                    ],
                    flight: {
                        id: 'sepehr-001',
                        flightNumber: 'SP001',
                        departure: {
                            dateTime: new Date().toISOString(),
                            airport: {
                                code: 'THR',
                                name: { fa: 'فرودگاه امام خمینی', en: 'Imam Khomeini Airport' }
                            }
                        },
                        arrival: {
                            dateTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
                            airport: {
                                code: 'MHD',
                                name: { fa: 'فرودگاه مشهد', en: 'Mashhad Airport' }
                            }
                        }
                    },
                    totalPrice: 1500000,
                    currency: 'IRR',
                    paymentStatus: 'PAID',
                    bookingDate: new Date().toISOString()
                },
                message: 'Booking status retrieved successfully'
            };
            this.logger.log(`✅ Booking status retrieved: ${bookingId}`);
            return mockResponse;
        }
        catch (error) {
            this.logger.error(`❌ Get booking status failed: ${error.message}`);
            throw new Error(`Sepehr API error: ${error.message}`);
        }
    }
    async checkConnection() {
        try {
            this.logger.log('🔍 Checking Sepehr API connection...');
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.logger.log('✅ Sepehr API connection successful');
            return true;
        }
        catch (error) {
            this.logger.error(`❌ Sepehr API connection check failed: ${error.message}`);
            return false;
        }
    }
};
exports.SepehrApiService = SepehrApiService;
exports.SepehrApiService = SepehrApiService = SepehrApiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], SepehrApiService);
//# sourceMappingURL=sepehr-api.service.js.map