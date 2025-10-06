import { ConfigService } from '@nestjs/config';
export interface Charter118FlightSearchRequest {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    adults: number;
    children?: number;
    infants?: number;
    cabinClass?: string;
}
export interface Charter118FlightSearchResponse {
    success: boolean;
    data?: any[];
    error?: string;
    message?: string;
}
export interface Charter118BookingRequest {
    flightId: string;
    passengers: {
        adults: any[];
        children?: any[];
        infants?: any[];
    };
    contactInfo: {
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
    };
}
export interface Charter118BookingResponse {
    success: boolean;
    bookingId?: string;
    confirmationCode?: string;
    data?: any;
    error?: string;
    message?: string;
}
export declare class Charter118Service {
    private configService;
    private readonly logger;
    private readonly httpClient;
    private readonly baseUrl;
    private readonly apiKey;
    constructor(configService: ConfigService);
    searchFlights(searchRequest: Charter118FlightSearchRequest): Promise<Charter118FlightSearchResponse>;
    getFlightDetails(flightId: string): Promise<Charter118FlightSearchResponse>;
    bookFlight(bookingRequest: Charter118BookingRequest): Promise<Charter118BookingResponse>;
    getBookingStatus(bookingId: string): Promise<Charter118BookingResponse>;
    cancelBooking(bookingId: string): Promise<Charter118BookingResponse>;
    testConnection(): Promise<{
        success: boolean;
        message: string;
        data?: any;
    }>;
    getAirports(): Promise<Charter118FlightSearchResponse>;
    getAirlines(): Promise<Charter118FlightSearchResponse>;
}
