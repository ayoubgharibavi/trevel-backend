import { Charter118Service, Charter118FlightSearchRequest, Charter118BookingRequest } from './charter118.service';
export declare class Charter118Controller {
    private readonly charter118Service;
    private readonly logger;
    constructor(charter118Service: Charter118Service);
    searchFlights(searchRequest: Charter118FlightSearchRequest): Promise<import("./charter118.service").Charter118FlightSearchResponse>;
    getFlightDetails(flightId: string): Promise<import("./charter118.service").Charter118FlightSearchResponse>;
    bookFlight(bookingRequest: Charter118BookingRequest): Promise<import("./charter118.service").Charter118BookingResponse>;
    getBookingStatus(bookingId: string): Promise<import("./charter118.service").Charter118BookingResponse>;
    cancelBooking(bookingId: string): Promise<import("./charter118.service").Charter118BookingResponse>;
    getAirports(): Promise<import("./charter118.service").Charter118FlightSearchResponse>;
    getAirlines(): Promise<import("./charter118.service").Charter118FlightSearchResponse>;
    testConnection(): Promise<{
        success: boolean;
        message: string;
        data?: any;
    }>;
    healthCheck(): Promise<{
        service: string;
        status: string;
        message: string;
        timestamp: string;
        data: any;
    }>;
}
