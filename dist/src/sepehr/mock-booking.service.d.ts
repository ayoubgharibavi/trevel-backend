export interface MockBookingRequest {
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
export interface MockBookingResponse {
    id: string;
    confirmationCode: string;
    status: 'CONFIRMED' | 'CANCELLED' | 'PENDING';
    flight: {
        id: string;
        flightNumber: string;
        departure: {
            airportCode: string;
            airportName: string;
            city: string;
            dateTime: string;
        };
        arrival: {
            airportCode: string;
            airportName: string;
            city: string;
            dateTime: string;
        };
        airline: {
            code: string;
            name: string;
            logo: string;
        };
        aircraft: {
            code: string;
            name: string;
        };
        flightClass: {
            code: string;
            name: string;
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
    };
    passengers: Array<{
        id: string;
        name: string;
        type: 'adult' | 'child' | 'infant';
        seatNumber: string;
        ticketNumber: string;
    }>;
    contactInfo: {
        email: string;
        phone: string;
    };
    totalPrice: number;
    currency: string;
    bookingDate: string;
    paymentStatus: 'PENDING' | 'PAID' | 'REFUNDED';
}
export declare class MockBookingService {
    private readonly logger;
    private bookings;
    private mockFlights;
    createBooking(request: MockBookingRequest): Promise<MockBookingResponse>;
    getBooking(bookingId: string): Promise<MockBookingResponse | null>;
    cancelBooking(bookingId: string): Promise<boolean>;
    getAllBookings(): Promise<MockBookingResponse[]>;
    private getMockFlight;
    initializeSampleBookings(): Promise<void>;
}
