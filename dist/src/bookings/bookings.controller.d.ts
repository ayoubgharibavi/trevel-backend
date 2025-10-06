import { Response } from 'express';
import { BookingsService } from './bookings.service';
import { CreateBookingDto, CancelBookingDto } from '../common/dto';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    getBookings(req: any): Promise<{
        flight: {
            departure: {
                dateTime: Date;
                city: any;
                airport: string;
                airportName: any;
            };
            arrival: {
                dateTime: Date;
                city: any;
                airport: string;
                airportName: any;
            };
            flightClassInfo: {
                id: string;
                name: string;
            } | null;
            aircraftInfo: {
                id: string;
                name: string;
                capacity: number;
            } | null;
            airlineInfo: {
                id: string;
                name: string;
                logoUrl: string;
            } | null;
            arrivalAirport: {
                id: string;
                name: string;
                country: string;
                code: string | null;
                iata: string;
                icao: string | null;
                city: string;
            } | null;
            departureAirport: {
                id: string;
                name: string;
                country: string;
                code: string | null;
                iata: string;
                icao: string | null;
                city: string;
            } | null;
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
        } | null;
        user: {
            id: string;
            name: string;
            email: string;
        };
        passengersInfo: {
            id: string;
            createdAt: Date;
            userId: string;
            firstName: string;
            lastName: string;
            gender: string;
            nationality: string;
            nationalId: string | null;
            passportNumber: string | null;
            bookingId: string | null;
            passportIssuingCountry: string | null;
            dateOfBirth: string | null;
            passportExpiryDate: string | null;
        }[];
        id: string;
        contactEmail: string;
        contactPhone: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        tenantId: string;
        userId: string;
        source: string;
        flightId: string;
        totalPrice: number | null;
        buyerReference: string | null;
        notes: string | null;
        purchasePrice: number | null;
        searchQuery: string;
        bookingDate: Date;
        cancellationDate: Date | null;
        passengersData: string;
    }[]>;
    createBooking(req: any, body: CreateBookingDto): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
        };
        flight: {
            flightClassInfo: {
                id: string;
                name: string;
            } | null;
            aircraftInfo: {
                id: string;
                name: string;
                capacity: number;
            } | null;
            airlineInfo: {
                id: string;
                name: string;
                logoUrl: string;
            } | null;
            arrivalAirport: {
                id: string;
                name: string;
                country: string;
                code: string | null;
                iata: string;
                icao: string | null;
                city: string;
            } | null;
            departureAirport: {
                id: string;
                name: string;
                country: string;
                code: string | null;
                iata: string;
                icao: string | null;
                city: string;
            } | null;
        } & {
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
    } & {
        id: string;
        contactEmail: string;
        contactPhone: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        tenantId: string;
        userId: string;
        source: string;
        flightId: string;
        totalPrice: number | null;
        buyerReference: string | null;
        notes: string | null;
        purchasePrice: number | null;
        searchQuery: string;
        bookingDate: Date;
        cancellationDate: Date | null;
        passengersData: string;
    }>;
    createManualBooking(req: any, body: CreateBookingDto): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
        };
        flight: {
            flightClassInfo: {
                id: string;
                name: string;
            } | null;
            aircraftInfo: {
                id: string;
                name: string;
                capacity: number;
            } | null;
            airlineInfo: {
                id: string;
                name: string;
                logoUrl: string;
            } | null;
            arrivalAirport: {
                id: string;
                name: string;
                country: string;
                code: string | null;
                iata: string;
                icao: string | null;
                city: string;
            } | null;
            departureAirport: {
                id: string;
                name: string;
                country: string;
                code: string | null;
                iata: string;
                icao: string | null;
                city: string;
            } | null;
        } & {
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
    } & {
        id: string;
        contactEmail: string;
        contactPhone: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        tenantId: string;
        userId: string;
        source: string;
        flightId: string;
        totalPrice: number | null;
        buyerReference: string | null;
        notes: string | null;
        purchasePrice: number | null;
        searchQuery: string;
        bookingDate: Date;
        cancellationDate: Date | null;
        passengersData: string;
    }>;
    getBooking(req: any, bookingId: string): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
        };
        flight: {
            flightClassInfo: {
                id: string;
                name: string;
            } | null;
            aircraftInfo: {
                id: string;
                name: string;
                capacity: number;
            } | null;
            airlineInfo: {
                id: string;
                name: string;
                logoUrl: string;
            } | null;
            arrivalAirport: {
                id: string;
                name: string;
                country: string;
                code: string | null;
                iata: string;
                icao: string | null;
                city: string;
            } | null;
            departureAirport: {
                id: string;
                name: string;
                country: string;
                code: string | null;
                iata: string;
                icao: string | null;
                city: string;
            } | null;
        } & {
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
        passengersInfo: {
            id: string;
            createdAt: Date;
            userId: string;
            firstName: string;
            lastName: string;
            gender: string;
            nationality: string;
            nationalId: string | null;
            passportNumber: string | null;
            bookingId: string | null;
            passportIssuingCountry: string | null;
            dateOfBirth: string | null;
            passportExpiryDate: string | null;
        }[];
    } & {
        id: string;
        contactEmail: string;
        contactPhone: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        tenantId: string;
        userId: string;
        source: string;
        flightId: string;
        totalPrice: number | null;
        buyerReference: string | null;
        notes: string | null;
        purchasePrice: number | null;
        searchQuery: string;
        bookingDate: Date;
        cancellationDate: Date | null;
        passengersData: string;
    }>;
    cancelBooking(req: any, bookingId: string, body: CancelBookingDto): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
        };
        flight: {
            flightClassInfo: {
                id: string;
                name: string;
            } | null;
            aircraftInfo: {
                id: string;
                name: string;
                capacity: number;
            } | null;
            airlineInfo: {
                id: string;
                name: string;
                logoUrl: string;
            } | null;
            arrivalAirport: {
                id: string;
                name: string;
                country: string;
                code: string | null;
                iata: string;
                icao: string | null;
                city: string;
            } | null;
            departureAirport: {
                id: string;
                name: string;
                country: string;
                code: string | null;
                iata: string;
                icao: string | null;
                city: string;
            } | null;
        } & {
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
        passengersInfo: {
            id: string;
            createdAt: Date;
            userId: string;
            firstName: string;
            lastName: string;
            gender: string;
            nationality: string;
            nationalId: string | null;
            passportNumber: string | null;
            bookingId: string | null;
            passportIssuingCountry: string | null;
            dateOfBirth: string | null;
            passportExpiryDate: string | null;
        }[];
    } & {
        id: string;
        contactEmail: string;
        contactPhone: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        tenantId: string;
        userId: string;
        source: string;
        flightId: string;
        totalPrice: number | null;
        buyerReference: string | null;
        notes: string | null;
        purchasePrice: number | null;
        searchQuery: string;
        bookingDate: Date;
        cancellationDate: Date | null;
        passengersData: string;
    }>;
    getETicket(req: any, bookingId: string): Promise<{
        bookingId: string;
        ticketNumber: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        totalPrice: number;
        currency: string;
    }>;
    downloadETicketPDF(req: any, bookingId: string, res: Response): Promise<void>;
}
