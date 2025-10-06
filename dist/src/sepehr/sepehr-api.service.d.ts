import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export interface SepehrFlightSearchRequest {
    departureCity: string;
    arrivalCity: string;
    departureDate: string;
    returnDate?: string;
    adults: number;
    children: number;
    infants: number;
}
export interface SepehrFlightSearchResponse {
    success: boolean;
    data: {
        flights: SepehrFlight[];
        totalCount: number;
        searchId: string;
    };
    message: string;
}
export interface SepehrFlight {
    id: string;
    flightNumber: string;
    airline: {
        code: string;
        name: {
            fa: string;
            en: string;
        };
        logo: string;
    };
    aircraft: {
        code: string;
        name: {
            fa: string;
            en: string;
        };
    };
    flightClass: {
        code: string;
        name: {
            fa: string;
            en: string;
        };
    };
    departure: {
        airport: {
            code: string;
            name: {
                fa: string;
                en: string;
            };
            city: {
                fa: string;
                en: string;
            };
        };
        dateTime: string;
        terminal: string;
        gate: string;
    };
    arrival: {
        airport: {
            code: string;
            name: {
                fa: string;
                en: string;
            };
            city: {
                fa: string;
                en: string;
            };
        };
        dateTime: string;
        terminal: string;
        gate: string;
    };
    price: {
        adult: number;
        child: number;
        infant: number;
        currency: string;
    };
    availableSeats: number;
    baggage: {
        weight: number;
        unit: string;
    };
    duration: number;
    stops: number;
}
export interface SepehrFlightDetailsResponse {
    success: boolean;
    data: {
        flight: SepehrFlight & {
            amenities: string[];
            policies: {
                cancellation: string;
                changes: string;
                refund: string;
            };
        };
    };
    message: string;
}
export interface SepehrBookingRequest {
    flightId: string;
    passengers: Array<{
        name: string;
        type: 'adult' | 'child' | 'infant';
    }>;
    contactInfo: {
        email: string;
        phone: string;
    };
}
export interface SepehrBookingResponse {
    success: boolean;
    data: {
        bookingId: string;
        pnr: string;
        status: string;
        passengers: Array<{
            id: string;
            name: string;
            seatNumber: string;
            ticketNumber: string;
        }>;
        flight: {
            id: string;
            flightNumber: string;
            departure: {
                dateTime: string;
                airport: {
                    code: string;
                    name: {
                        fa: string;
                        en: string;
                    };
                };
            };
            arrival: {
                dateTime: string;
                airport: {
                    code: string;
                    name: {
                        fa: string;
                        en: string;
                    };
                };
            };
        };
        totalPrice: number;
        currency: string;
        paymentStatus: string;
        bookingDate: string;
    };
    message: string;
}
export interface SepehrCancelResponse {
    success: boolean;
    data: {
        bookingId: string;
        status: string;
        refundAmount: number;
        currency: string;
        cancellationDate: string;
    };
    message: string;
}
export interface SepehrBookingStatusResponse {
    success: boolean;
    data: {
        bookingId: string;
        status: string;
        pnr: string;
        passengers: Array<{
            id: string;
            name: string;
            seatNumber: string;
            ticketNumber: string;
        }>;
        flight: {
            id: string;
            flightNumber: string;
            departure: {
                dateTime: string;
                airport: {
                    code: string;
                    name: {
                        fa: string;
                        en: string;
                    };
                };
            };
            arrival: {
                dateTime: string;
                airport: {
                    code: string;
                    name: {
                        fa: string;
                        en: string;
                    };
                };
            };
        };
        totalPrice: number;
        currency: string;
        paymentStatus: string;
        bookingDate: string;
    };
    message: string;
}
export declare class SepehrApiService {
    private readonly httpService;
    private readonly configService;
    private readonly logger;
    private readonly baseUrl;
    private readonly apiKey;
    private readonly apiSecret;
    constructor(httpService: HttpService, configService: ConfigService);
    searchFlights(request: SepehrFlightSearchRequest): Promise<SepehrFlightSearchResponse>;
    getFlightDetails(flightId: string): Promise<SepehrFlightDetailsResponse>;
    bookFlight(bookingRequest: SepehrBookingRequest): Promise<SepehrBookingResponse>;
    cancelBooking(bookingId: string): Promise<SepehrCancelResponse>;
    getBookingStatus(bookingId: string): Promise<SepehrBookingStatusResponse>;
    checkConnection(): Promise<boolean>;
}
