import { PrismaService } from '../prisma/prisma.service';
import { CreateFlightDto, UpdateFlightDto } from '../common/dto';
export declare class FlightsService {
    private prisma;
    constructor(prisma: PrismaService);
    search(query: Record<string, string>, user?: any): Promise<{
        id: string;
        airline: any;
        airlineLogoUrl: string | null;
        flightNumber: string;
        departure: {
            airportCode: string;
            airportName: any;
            city: any;
            dateTime: string;
        };
        arrival: {
            airportCode: string;
            airportName: any;
            city: any;
            dateTime: string;
        };
        aircraft: any;
        flightClass: any;
        duration: string;
        stops: number;
        price: number;
        taxes: number;
        availableSeats: number;
        totalCapacity: number;
        baggageAllowance: string | null;
        status: import(".prisma/client").$Enums.FlightStatus;
    }[]>;
    getPopularRoutes(): Promise<({
        from: any;
        to: any;
        count: number;
    } | null)[]>;
    getById(flightId: string): Promise<{
        id: string;
        airline: any;
        airlineLogoUrl: string;
        flightNumber: string;
        departure: {
            airportCode: string;
            airportName: any;
            city: any;
            dateTime: string;
        };
        arrival: {
            airportCode: string;
            airportName: any;
            city: any;
            dateTime: string;
        };
        aircraft: any;
        flightClass: any;
        duration: string;
        stops: number;
        price: number;
        taxes: number;
        availableSeats: number;
        totalCapacity: number;
        baggageAllowance: string | null;
        status: import(".prisma/client").$Enums.FlightStatus;
    }>;
    aiSearch(query: Record<string, string>, language?: string, user?: any): Promise<{
        id: string;
        airline: string;
        airlineLogoUrl: string;
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
        duration: string;
        stops: number;
        price: number;
        taxes: number;
        flightClass: string;
        aircraft: string;
        availableSeats: number;
        baggageAllowance: string;
    }[]>;
    autoCancelPastFlights(): Promise<void>;
    cancelPastFlights(): Promise<{
        success: boolean;
        message: string;
        cancelledFlights: {
            flightId: string;
            flightNumber: string;
            departureTime: Date;
            cancelledBookings: number;
        }[];
    }>;
    createFlight(createFlightDto: CreateFlightDto): Promise<{
        id: string;
        airline: any;
        airlineLogoUrl: string | null;
        flightNumber: string;
        departure: {
            airportCode: string;
            airportName: any;
            city: any;
            dateTime: string;
        };
        arrival: {
            airportCode: string;
            airportName: any;
            city: any;
            dateTime: string;
        };
        aircraft: any;
        flightClass: any;
        duration: string;
        stops: number;
        price: number;
        taxes: number;
        availableSeats: number;
        totalCapacity: number;
        baggageAllowance: string | null;
        status: import(".prisma/client").$Enums.FlightStatus;
        bookingClosesBeforeDepartureHours: number;
        sourcingType: string;
        commissionModelId: string | null;
        refundPolicyId: string | null;
        creatorId: string | null;
        tenantId: string | null;
        allotments: any;
    }>;
    updateFlight(flightId: string, updateFlightDto: UpdateFlightDto): Promise<{
        id: string;
        airline: any;
        airlineLogoUrl: string | null;
        flightNumber: string;
        departure: {
            airportCode: any;
            airportName: any;
            city: any;
            dateTime: string;
        };
        arrival: {
            airportCode: any;
            airportName: any;
            city: any;
            dateTime: string;
        };
        aircraft: any;
        flightClass: any;
        duration: string;
        stops: number;
        price: number;
        taxes: number;
        availableSeats: number;
        totalCapacity: number;
        baggageAllowance: string | null;
        status: import(".prisma/client").$Enums.FlightStatus;
        bookingClosesBeforeDepartureHours: number;
        sourcingType: string;
        commissionModelId: string | null;
        refundPolicyId: string | null;
        creatorId: string | null;
        tenantId: string | null;
        allotments: any;
    }>;
    deleteFlight(flightId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.FlightStatus;
        tenantId: string | null;
        airline: string;
        aircraft: string;
        flightClass: string;
        airlineId: string | null;
        airlineLogoUrl: string | null;
        flightNumber: string;
        duration: number;
        stops: number;
        price: bigint;
        taxes: bigint;
        availableSeats: number;
        totalCapacity: number;
        baggageAllowance: string | null;
        bookingClosesBeforeDepartureHours: number;
        sourcingType: string;
        source: string;
        commissionModelId: string | null;
        refundPolicyId: string | null;
        creatorId: string | null;
        departureAirportId: string | null;
        departureTerminal: string | null;
        departureGate: string | null;
        departureTime: Date;
        arrivalAirportId: string | null;
        arrivalTerminal: string | null;
        arrivalGate: string | null;
        arrivalTime: Date;
        aircraftId: string | null;
        flightClassId: string | null;
    }>;
    searchAirports(searchTerm: string): Promise<{
        id: string;
        code: string;
        city: any;
        name: any;
        country: any;
        isActive: boolean;
    }[]>;
    getDailyPrices(from: string, to: string, month?: string): Promise<{
        success: boolean;
        data: {
            date: string;
            price: number;
            isLowest: boolean;
        }[];
        month: string;
    }>;
    saveCharter118Flight(flight: any, charter118BookingId: string): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.FlightStatus;
            tenantId: string | null;
            airline: string;
            aircraft: string;
            flightClass: string;
            airlineId: string | null;
            airlineLogoUrl: string | null;
            flightNumber: string;
            duration: number;
            stops: number;
            price: bigint;
            taxes: bigint;
            availableSeats: number;
            totalCapacity: number;
            baggageAllowance: string | null;
            bookingClosesBeforeDepartureHours: number;
            sourcingType: string;
            source: string;
            commissionModelId: string | null;
            refundPolicyId: string | null;
            creatorId: string | null;
            departureAirportId: string | null;
            departureTerminal: string | null;
            departureGate: string | null;
            departureTime: Date;
            arrivalAirportId: string | null;
            arrivalTerminal: string | null;
            arrivalGate: string | null;
            arrivalTime: Date;
            aircraftId: string | null;
            flightClassId: string | null;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        message: string;
        data?: undefined;
    }>;
    private parseDurationToMinutes;
}
