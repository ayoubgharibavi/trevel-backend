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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Charter118Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Charter118Service = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
let Charter118Service = Charter118Service_1 = class Charter118Service {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(Charter118Service_1.name);
        this.baseUrl = this.configService.get('CHARTER118_BASE_URL') || 'https://api.charter118.com';
        this.apiKey = this.configService.get('CHARTER118_API_KEY') || '';
        this.httpClient = axios_1.default.create({
            baseURL: this.baseUrl,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Trevel-Booking-System/1.0'
            }
        });
        if (this.apiKey) {
            this.httpClient.defaults.headers.common['Authorization'] = `Bearer ${this.apiKey}`;
        }
        this.httpClient.interceptors.request.use((config) => {
            this.logger.debug(`Charter118 API Request: ${config.method?.toUpperCase()} ${config.url}`);
            return config;
        }, (error) => {
            this.logger.error('Charter118 API Request Error:', error);
            return Promise.reject(error);
        });
        this.httpClient.interceptors.response.use((response) => {
            this.logger.debug(`Charter118 API Response: ${response.status} ${response.config.url}`);
            return response;
        }, (error) => {
            this.logger.error('Charter118 API Response Error:', error.response?.data || error.message);
            return Promise.reject(error);
        });
    }
    async searchFlights(searchRequest) {
        try {
            this.logger.log(`Searching flights: ${searchRequest.origin} → ${searchRequest.destination}`);
            const mockFlights = [
                {
                    id: 'charter118-001',
                    flightNumber: 'C118-001',
                    airline: 'Charter118 Airline',
                    departure: {
                        airport: searchRequest.origin,
                        airportCode: searchRequest.origin === 'تهران' ? 'IKA' : 'DXB',
                        city: searchRequest.origin,
                        dateTime: searchRequest.departureDate + 'T10:00:00.000Z',
                        terminal: 'T1',
                        gate: 'C1'
                    },
                    arrival: {
                        airport: searchRequest.destination,
                        airportCode: searchRequest.destination === 'دبی' ? 'DXB' : 'IKA',
                        city: searchRequest.destination,
                        dateTime: searchRequest.departureDate + 'T13:30:00.000Z',
                        terminal: 'T1',
                        gate: 'D1'
                    },
                    aircraft: 'Boeing 737',
                    flightClass: 'Economy',
                    duration: '3h 30m',
                    stops: 0,
                    price: 1800000,
                    taxes: 180000,
                    availableSeats: 80,
                    totalCapacity: 150,
                    baggageAllowance: '25 KG',
                    status: 'ON_TIME'
                },
                {
                    id: 'charter118-002',
                    flightNumber: 'C118-002',
                    airline: 'Charter118 Express',
                    departure: {
                        airport: searchRequest.origin,
                        airportCode: searchRequest.origin === 'تهران' ? 'IKA' : 'DXB',
                        city: searchRequest.origin,
                        dateTime: searchRequest.departureDate + 'T16:00:00.000Z',
                        terminal: 'T2',
                        gate: 'C2'
                    },
                    arrival: {
                        airport: searchRequest.destination,
                        airportCode: searchRequest.destination === 'دبی' ? 'DXB' : 'IKA',
                        city: searchRequest.destination,
                        dateTime: searchRequest.departureDate + 'T19:30:00.000Z',
                        terminal: 'T2',
                        gate: 'D2'
                    },
                    aircraft: 'Airbus A320',
                    flightClass: 'Economy',
                    duration: '3h 30m',
                    stops: 0,
                    price: 1650000,
                    taxes: 165000,
                    availableSeats: 95,
                    totalCapacity: 180,
                    baggageAllowance: '25 KG',
                    status: 'ON_TIME'
                }
            ];
            this.logger.log(`Found ${mockFlights.length} mock flights`);
            return {
                success: true,
                data: mockFlights,
                message: 'Mock flights found successfully'
            };
        }
        catch (error) {
            this.logger.error('Charter118 search error:', error);
            return {
                success: false,
                error: error.message || 'Search request failed',
                message: 'Unable to search flights'
            };
        }
    }
    async getFlightDetails(flightId) {
        try {
            this.logger.log(`Getting flight details for ID: ${flightId}`);
            const response = await this.httpClient.get(`/flights/${flightId}`);
            if (response.data && response.data.success) {
                return {
                    success: true,
                    data: response.data.data,
                    message: response.data.message
                };
            }
            else {
                return {
                    success: false,
                    error: response.data?.message || 'Flight not found',
                    message: 'Unable to get flight details'
                };
            }
        }
        catch (error) {
            this.logger.error('Charter118 get flight details error:', error);
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Request failed',
                message: 'Unable to get flight details'
            };
        }
    }
    async bookFlight(bookingRequest) {
        try {
            this.logger.log(`Booking flight: ${bookingRequest.flightId}`);
            const mockBookingResponse = {
                success: true,
                booking_id: `C118-BOOK-${Date.now()}`,
                confirmation_code: `C118-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                data: {
                    flightId: bookingRequest.flightId,
                    passengers: bookingRequest.passengers,
                    contactInfo: bookingRequest.contactInfo,
                    bookingDate: new Date().toISOString(),
                    status: 'CONFIRMED'
                },
                message: 'Booking completed successfully'
            };
            this.logger.log(`Mock booking successful: ${mockBookingResponse.booking_id}`);
            return {
                success: true,
                bookingId: mockBookingResponse.booking_id,
                confirmationCode: mockBookingResponse.confirmation_code,
                data: mockBookingResponse.data,
                message: mockBookingResponse.message
            };
        }
        catch (error) {
            this.logger.error('Charter118 booking error:', error);
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Booking request failed',
                message: 'Unable to complete booking'
            };
        }
    }
    async getBookingStatus(bookingId) {
        try {
            this.logger.log(`Getting booking status: ${bookingId}`);
            const response = await this.httpClient.get(`/bookings/${bookingId}`);
            if (response.data && response.data.success) {
                return {
                    success: true,
                    data: response.data.data,
                    message: response.data.message
                };
            }
            else {
                return {
                    success: false,
                    error: response.data?.message || 'Booking not found',
                    message: 'Unable to get booking status'
                };
            }
        }
        catch (error) {
            this.logger.error('Charter118 get booking status error:', error);
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Request failed',
                message: 'Unable to get booking status'
            };
        }
    }
    async cancelBooking(bookingId) {
        try {
            this.logger.log(`Cancelling booking: ${bookingId}`);
            const response = await this.httpClient.delete(`/bookings/${bookingId}`);
            if (response.data && response.data.success) {
                this.logger.log(`Booking cancelled successfully: ${bookingId}`);
                return {
                    success: true,
                    data: response.data.data,
                    message: response.data.message
                };
            }
            else {
                return {
                    success: false,
                    error: response.data?.message || 'Cancellation failed',
                    message: 'Unable to cancel booking'
                };
            }
        }
        catch (error) {
            this.logger.error('Charter118 cancel booking error:', error);
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Cancellation request failed',
                message: 'Unable to cancel booking'
            };
        }
    }
    async testConnection() {
        try {
            this.logger.log('Testing Charter118 API connection');
            const response = await this.httpClient.get('/health');
            if (response.data && response.data.success) {
                return {
                    success: true,
                    message: 'Charter118 API connection successful',
                    data: response.data
                };
            }
            else {
                return {
                    success: false,
                    message: 'Charter118 API connection failed'
                };
            }
        }
        catch (error) {
            this.logger.error('Charter118 connection test error:', error);
            return {
                success: false,
                message: `Charter118 API connection failed: ${error.message}`
            };
        }
    }
    async getAirports() {
        try {
            this.logger.log('Getting airports list from Charter118');
            const response = await this.httpClient.get('/airports');
            if (response.data && response.data.success) {
                return {
                    success: true,
                    data: response.data.data,
                    message: response.data.message
                };
            }
            else {
                return {
                    success: false,
                    error: response.data?.message || 'Unable to get airports',
                    message: 'Unable to fetch airports list'
                };
            }
        }
        catch (error) {
            this.logger.error('Charter118 get airports error:', error);
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Request failed',
                message: 'Unable to fetch airports list'
            };
        }
    }
    async getAirlines() {
        try {
            this.logger.log('Getting airlines list from Charter118');
            const response = await this.httpClient.get('/airlines');
            if (response.data && response.data.success) {
                return {
                    success: true,
                    data: response.data.data,
                    message: response.data.message
                };
            }
            else {
                return {
                    success: false,
                    error: response.data?.message || 'Unable to get airlines',
                    message: 'Unable to fetch airlines list'
                };
            }
        }
        catch (error) {
            this.logger.error('Charter118 get airlines error:', error);
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Request failed',
                message: 'Unable to fetch airlines list'
            };
        }
    }
};
exports.Charter118Service = Charter118Service;
exports.Charter118Service = Charter118Service = Charter118Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], Charter118Service);
//# sourceMappingURL=charter118.service.js.map