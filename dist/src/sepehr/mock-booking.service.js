"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MockBookingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockBookingService = void 0;
const common_1 = require("@nestjs/common");
let MockBookingService = MockBookingService_1 = class MockBookingService {
    constructor() {
        this.logger = new common_1.Logger(MockBookingService_1.name);
        this.bookings = new Map();
        this.mockFlights = {
            'sepehr-123': {
                id: 'sepehr-123',
                flightNumber: 'IR1234',
                departure: {
                    airportCode: 'IKA',
                    airportName: 'فرودگاه امام خمینی',
                    city: 'تهران',
                    dateTime: new Date().toISOString(),
                },
                arrival: {
                    airportCode: 'MHD',
                    airportName: 'فرودگاه شهید هاشمی نژاد',
                    city: 'مشهد',
                    dateTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
                },
                airline: {
                    code: 'IR',
                    name: 'ایران ایر',
                    logo: 'https://example.com/iranair-logo.png'
                },
                aircraft: {
                    code: 'A320',
                    name: 'ایرباس A320'
                },
                flightClass: {
                    code: 'Y',
                    name: 'اکونومی'
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
            },
            'sepehr-456': {
                id: 'sepehr-456',
                flightNumber: 'IR5678',
                departure: {
                    airportCode: 'MHD',
                    airportName: 'فرودگاه شهید هاشمی نژاد',
                    city: 'مشهد',
                    dateTime: new Date().toISOString(),
                },
                arrival: {
                    airportCode: 'IKA',
                    airportName: 'فرودگاه امام خمینی',
                    city: 'تهران',
                    dateTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
                },
                airline: {
                    code: 'IR',
                    name: 'ایران ایر',
                    logo: 'https://example.com/iranair-logo.png'
                },
                aircraft: {
                    code: 'A320',
                    name: 'ایرباس A320'
                },
                flightClass: {
                    code: 'Y',
                    name: 'اکونومی'
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
        };
    }
    async createBooking(request) {
        this.logger.log(`🔍 Creating mock booking for flight: ${request.flightId}`);
        const bookingId = `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const confirmationCode = `CONF-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
        const isSuccess = Math.random() > 0.1;
        const mockFlight = this.getMockFlight(request.flightId);
        if (!mockFlight) {
            throw new Error('Flight not found');
        }
        if (!isSuccess) {
            throw new Error('Booking failed - service unavailable');
        }
        const booking = {
            id: bookingId,
            confirmationCode,
            status: 'CONFIRMED',
            flight: mockFlight,
            passengers: request.passengers.map((passenger, index) => ({
                id: `passenger-${index + 1}`,
                name: passenger.name,
                type: passenger.type,
                seatNumber: `A${index + 1}`,
                ticketNumber: `TK${Date.now()}${index + 1}`
            })),
            contactInfo: request.contactInfo,
            totalPrice: request.passengers.reduce((total, passenger) => {
                const price = passenger.type === 'adult' ? mockFlight.price.adult :
                    passenger.type === 'child' ? mockFlight.price.child :
                        mockFlight.price.infant;
                return total + price;
            }, 0),
            currency: mockFlight.price.currency,
            bookingDate: new Date().toISOString(),
            paymentStatus: 'PENDING'
        };
        this.bookings.set(bookingId, booking);
        this.logger.log(`✅ Mock booking created: ${bookingId}`);
        return booking;
    }
    async getBooking(bookingId) {
        this.logger.log(`🔍 Getting mock booking: ${bookingId}`);
        const booking = this.bookings.get(bookingId);
        if (booking) {
            this.logger.log(`✅ Mock booking found: ${bookingId}`);
            return booking;
        }
        this.logger.warn(`⚠️ Mock booking not found: ${bookingId}`);
        return null;
    }
    async cancelBooking(bookingId) {
        this.logger.log(`🔍 Cancelling mock booking: ${bookingId}`);
        const booking = this.bookings.get(bookingId);
        if (!booking) {
            this.logger.warn(`⚠️ Mock booking not found for cancellation: ${bookingId}`);
            return false;
        }
        if (booking.status === 'CANCELLED') {
            this.logger.warn(`⚠️ Mock booking already cancelled: ${bookingId}`);
            return false;
        }
        booking.status = 'CANCELLED';
        booking.paymentStatus = 'REFUNDED';
        this.bookings.set(bookingId, booking);
        this.logger.log(`✅ Mock booking cancelled: ${bookingId}`);
        return true;
    }
    async getAllBookings() {
        return Array.from(this.bookings.values());
    }
    getMockFlight(flightId) {
        return this.mockFlights[flightId] || null;
    }
    async initializeSampleBookings() {
        this.logger.log('🔍 Initializing sample mock bookings...');
        const sampleRequests = [
            {
                flightId: 'sepehr-123',
                passengers: [
                    { name: 'احمد محمدی', type: 'adult' },
                    { name: 'فاطمه احمدی', type: 'adult' }
                ],
                contactInfo: {
                    email: 'ahmad@example.com',
                    phone: '09123456789'
                }
            },
            {
                flightId: 'sepehr-456',
                passengers: [
                    { name: 'علی رضایی', type: 'adult' }
                ],
                contactInfo: {
                    email: 'ali@example.com',
                    phone: '09987654321'
                }
            }
        ];
        for (const request of sampleRequests) {
            try {
                await this.createBooking(request);
            }
            catch (error) {
                this.logger.error(`Failed to create sample booking: ${error.message}`);
            }
        }
    }
};
exports.MockBookingService = MockBookingService;
exports.MockBookingService = MockBookingService = MockBookingService_1 = __decorate([
    (0, common_1.Injectable)()
], MockBookingService);
//# sourceMappingURL=mock-booking.service.js.map