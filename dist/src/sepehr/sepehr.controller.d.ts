import { SepehrApiService } from './sepehr-api.service';
import { SepehrFlightSearchDto, SepehrBookingDto } from '../common/dto';
import { MockBookingService } from './mock-booking.service';
export declare class SepehrController {
    private readonly sepehrApiService;
    private readonly mockBookingService;
    constructor(sepehrApiService: SepehrApiService, mockBookingService: MockBookingService);
    searchFlights(searchDto: SepehrFlightSearchDto): Promise<import("./sepehr-api.service").SepehrFlightSearchResponse>;
    checkHealth(): Promise<{
        success: boolean;
        message: string;
        timestamp: string;
    }>;
    getFlightDetails(flightId: string): Promise<import("./sepehr-api.service").SepehrFlightDetailsResponse>;
    bookFlight(bookingDto: SepehrBookingDto): Promise<import("./sepehr-api.service").SepehrBookingResponse>;
    getBookingStatus(bookingId: string): Promise<import("./sepehr-api.service").SepehrBookingStatusResponse>;
    cancelBooking(bookingId: string, body: {
        reason?: string;
    }): Promise<import("./sepehr-api.service").SepehrCancelResponse>;
    getAllBookings(): Promise<import("./mock-booking.service").MockBookingResponse[]>;
}
