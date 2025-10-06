import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): Promise<{
        savedPassengers: {
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
        wallets: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            balance: bigint;
            currency: string;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        username: string;
        phone: string | null;
        passwordHash: string;
        role: import(".prisma/client").$Enums.UserRole;
        status: import(".prisma/client").$Enums.UserStatus;
        canBypassRateLimit: boolean;
        tenantId: string | null;
        displayCurrencies: string;
    }>;
    updateProfile(userId: string, data: {
        name?: string;
        currentPassword?: string;
        newPassword?: string;
    }): Promise<{
        success: boolean;
        message: string;
        user: {
            id: string;
            name: string;
            createdAt: Date;
            email: string;
            username: string;
            phone: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            status: import(".prisma/client").$Enums.UserStatus;
            canBypassRateLimit: boolean;
            tenantId: string | null;
            displayCurrencies: string;
            savedPassengers: {
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
        };
    }>;
    getWallet(userId: string): Promise<any>;
    getSavedPassengers(userId: string): Promise<{
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
    }[]>;
    addSavedPassenger(userId: string, data: any): Promise<{
        success: boolean;
        passenger: {
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
        };
    }>;
    updateSavedPassenger(userId: string, passengerId: string, data: any): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteSavedPassenger(userId: string, passengerId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getAffiliateStats(userId: string): Promise<{
        totalEarnings: number;
        totalBookings: number;
        totalFlights: number;
        conversionRate: number;
        monthlyEarnings: {
            month: string;
            earnings: number;
        }[];
        topRoutes: {
            route: string;
            bookings: number;
            earnings: number;
        }[];
    }>;
    getAffiliateFlights(userId: string): Promise<({
        flightClassInfo: {
            id: string;
            name: string;
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
    })[]>;
    getAffiliateBookings(userId: string): Promise<({
        user: {
            name: string;
        };
        flight: {
            flightNumber: string;
            arrivalAirport: {
                city: string;
            } | null;
            departureAirport: {
                city: string;
            } | null;
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
    })[]>;
    getAffiliateAccounting(userId: string): Promise<{
        totalEarnings: number;
        pendingCommissions: number;
        paidCommissions: number;
        commissionRate: number;
        transactions: {
            id: string;
            date: string;
            type: import(".prisma/client").$Enums.TransactionType;
            amount: number;
            description: string;
            bookingId: string | null;
        }[];
    }>;
}
