import { AdminService } from './admin.service';
import { UpdateUserDto, CreateFlightDto, UpdateFlightDto } from '../common/dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    cancelPastFlights(req: any): Promise<{
        success: boolean;
        message: string;
        cancelledFlights: {
            flightId: string;
            flightNumber: string;
            departureTime: Date;
            cancelledBookings: number;
        }[];
    }>;
    getStats(req: any): Promise<{
        totalUsers: number;
        totalBookings: number;
        totalRevenue: number;
        totalIncome: number;
        netProfit: number;
        totalExpenses: number;
        upcomingFlights: number;
        activeFlights: number;
        pendingTickets: number;
        recentBookings: {
            id: string;
            user: string;
            flight: string;
            amount: number;
            date: string;
        }[];
        revenueChart: {
            month: string;
            revenue: number;
        }[];
    }>;
    getUsers(page?: number, limit?: number): Promise<{
        users: {
            id: string;
            name: string;
            createdAt: Date;
            email: string;
            username: string;
            role: import(".prisma/client").$Enums.UserRole;
            status: import(".prisma/client").$Enums.UserStatus;
            tenantId: string | null;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    createUser(data: any): Promise<{
        success: boolean;
        data: {
            user: {
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
            };
        };
    }>;
    updateUser(userId: string, body: UpdateUserDto): Promise<{
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
    chargeUserWallet(userId: string, body: {
        amount: number;
        currency: string;
        description: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    resetUserPassword(userId: string, body: {
        newPassword: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    getBookings(page?: number, status?: string): Promise<{
        bookings: ({
            user: {
                id: string;
                name: string;
                email: string;
            };
            flight: {
                id: string;
                airline: string;
                flightClass: string;
                flightNumber: string;
                departureTime: Date;
                arrivalTime: Date;
                arrivalAirport: {
                    name: string;
                    iata: string;
                    city: string;
                } | null;
                departureAirport: {
                    name: string;
                    iata: string;
                    city: string;
                } | null;
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
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    updateBooking(bookingId: string, bookingData: any): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
        };
        flight: {
            id: string;
            airline: string;
            flightClass: string;
            flightNumber: string;
            departureTime: Date;
            arrivalTime: Date;
            arrivalAirport: {
                name: string;
                iata: string;
                city: string;
            } | null;
            departureAirport: {
                name: string;
                iata: string;
                city: string;
            } | null;
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
    fixBookingSources(): Promise<{
        success: boolean;
        message: string;
        charter118Fixed: number;
        sepehrFixed: number;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        charter118Fixed?: undefined;
        sepehrFixed?: undefined;
    }>;
    forceUpdateBookingSource(bookingId: string, body: {
        source: string;
    }): Promise<{
        success: boolean;
        message: string;
        booking: {
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
        };
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        booking?: undefined;
    }>;
    getFlights(): Promise<{
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
    }[]>;
    createFlight(req: any, body: CreateFlightDto): Promise<{
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
    updateFlight(flightId: string, body: UpdateFlightDto): Promise<{
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
    toggleFlightStatus(flightId: string): Promise<{
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
    getFlightSalesReport(flightId: string): Promise<{
        flight: {
            bookings: ({
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
            })[];
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
        totalBookedSeats: number;
        totalRevenue: number;
        availableSeats: number;
        utilizationRate: number;
    }>;
    getFlightCapacityReport(flightId: string): Promise<{
        flightId: string;
        totalCapacity: number;
        salesCapacity: number;
        soldSeats: number;
        remainingCapacity: number;
        utilizationRate: number;
    }>;
    getFlightAllotments(flightId: string): Promise<({
        agent: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        expiresAt: Date;
        flightId: string;
        seats: number;
        agentId: string;
    })[]>;
    createAllotment(flightId: string, data: {
        agentId: string;
        seats: number;
        expiresAt: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        expiresAt: Date;
        flightId: string;
        seats: number;
        agentId: string;
    }>;
    deleteAllotment(flightId: string, allotmentId: string): Promise<{
        message: string;
    }>;
    getAllTickets(status?: string): Promise<{
        id: string;
        subject: string;
        status: import(".prisma/client").$Enums.TicketStatus;
        priority: string;
        createdAt: string;
        updatedAt: string;
        bookingId: string | null;
        user: {
            id: string;
            name: string;
            email: string;
        };
        messages: {
            id: string;
            author: "USER" | "ADMIN";
            authorName: string;
            text: string;
            timestamp: string;
        }[];
    }[]>;
    updateTicketStatus(ticketId: string, body: {
        status: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    adminReplyToTicket(req: any, ticketId: string, body: {
        message: string;
        sendChannels: {
            email: boolean;
            sms: boolean;
            whatsapp: boolean;
        };
    }): Promise<{
        success: boolean;
        data: {
            id: string;
            subject: string;
            status: import(".prisma/client").$Enums.TicketStatus;
            priority: string;
            createdAt: string;
            updatedAt: string;
            bookingId: string | null;
            user: {
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
            };
            messages: {
                id: string;
                author: "USER" | "ADMIN";
                authorName: string;
                text: string;
                timestamp: string;
            }[];
        };
        message: {
            id: string;
            timestamp: Date;
            ticketId: string;
            authorId: string;
            authorType: string;
            text: string;
        };
        notifications: string;
        ticketStatus: import(".prisma/client").$Enums.TicketStatus;
    }>;
    getBasicData(type: string): Promise<{
        name: any;
        id: string;
    }[]>;
    createBasicData(type: string, data: any): Promise<{
        id: string;
        name: string;
    }>;
    updateBasicData(type: string, id: string, data: any): Promise<{
        id: string;
        name: string;
    }>;
    deleteBasicData(type: string, id: string): Promise<{
        id: string;
        name: string;
    }>;
    getCommissionModels(): Promise<{
        id: string;
        name: string;
        calculationType: string;
        charterCommission: number;
        creatorCommission: number;
        webServiceCommission: number;
    }[]>;
    createCommissionModel(data: any): Promise<{
        id: string;
        name: string;
        calculationType: string;
        charterCommission: number;
        creatorCommission: number;
        webServiceCommission: number;
    }>;
    updateCommissionModel(id: string, data: any): Promise<{
        id: string;
        name: string;
        calculationType: string;
        charterCommission: number;
        creatorCommission: number;
        webServiceCommission: number;
    }>;
    deleteCommissionModel(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getRateLimits(): Promise<{
        id: string;
        fromCity: string;
        toCity: string;
        maxPrice: number;
    }[]>;
    createRateLimit(data: any): Promise<{
        id: string;
        fromCity: string;
        toCity: string;
        maxPrice: number;
    }>;
    updateRateLimit(id: string, data: any): Promise<{
        id: string;
        fromCity: string;
        toCity: string;
        maxPrice: number;
    }>;
    deleteRateLimit(id: string): Promise<{
        id: string;
        fromCity: string;
        toCity: string;
        maxPrice: number;
    }>;
    getRefundPolicies(): Promise<({} & {
        id: string;
        name: string;
        policyType: string | null;
        airlineId: string | null;
        rules: string;
    })[]>;
    createRefundPolicy(data: any): Promise<{} & {
        id: string;
        name: string;
        policyType: string | null;
        airlineId: string | null;
        rules: string;
    }>;
    updateRefundPolicy(id: string, data: any): Promise<{} & {
        id: string;
        name: string;
        policyType: string | null;
        airlineId: string | null;
        rules: string;
    }>;
    deleteRefundPolicy(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getActivityLogs(page?: number, limit?: number): Promise<any>;
    getTenants(): Promise<{
        id: string;
        slug: string;
        domain: string | null;
        subdomain: string | null;
        customDomain: string | null;
        name: string;
        contactEmail: string;
        contactPhone: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        logoUrl: string | null;
        primaryColor: string | null;
        theme: string;
        homepageContentId: string;
        supportedLanguages: string;
        supportedCurrencies: string;
        parentTenantId: string | null;
        commissionRate: number;
        commissionAmount: bigint | null;
        commissionType: string;
        parentCommissionRate: number;
        parentCommissionAmount: bigint | null;
        parentCommissionType: string;
        isWhiteLabel: boolean;
        pricingType: string;
        customBranding: string | null;
        footerText: string | null;
        supportEmail: string | null;
        supportPhone: string | null;
    }[]>;
    getCommissionStats(tenantId: string): Promise<{
        totalCommission: number;
        pendingCommission: number;
        paidCommission: number;
        totalTransactions: number;
        pendingTransactions: number;
        paidTransactions: number;
    }>;
    createTenant(data: any): Promise<{
        id: string;
        slug: string;
        domain: string | null;
        subdomain: string | null;
        customDomain: string | null;
        name: string;
        contactEmail: string;
        contactPhone: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        logoUrl: string | null;
        primaryColor: string | null;
        theme: string;
        homepageContentId: string;
        supportedLanguages: string;
        supportedCurrencies: string;
        parentTenantId: string | null;
        commissionRate: number;
        commissionAmount: bigint | null;
        commissionType: string;
        parentCommissionRate: number;
        parentCommissionAmount: bigint | null;
        parentCommissionType: string;
        isWhiteLabel: boolean;
        pricingType: string;
        customBranding: string | null;
        footerText: string | null;
        supportEmail: string | null;
        supportPhone: string | null;
    }>;
    updateTenant(tenantId: string, data: any): Promise<{
        id: string;
        slug: string;
        domain: string | null;
        subdomain: string | null;
        customDomain: string | null;
        name: string;
        contactEmail: string;
        contactPhone: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        logoUrl: string | null;
        primaryColor: string | null;
        theme: string;
        homepageContentId: string;
        supportedLanguages: string;
        supportedCurrencies: string;
        parentTenantId: string | null;
        commissionRate: number;
        commissionAmount: bigint | null;
        commissionType: string;
        parentCommissionRate: number;
        parentCommissionAmount: bigint | null;
        parentCommissionType: string;
        isWhiteLabel: boolean;
        pricingType: string;
        customBranding: string | null;
        footerText: string | null;
        supportEmail: string | null;
        supportPhone: string | null;
    }>;
    getPermissions(): Promise<any>;
    updatePermissions(permissions: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getAdvertisements(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        imageUrl: string;
        linkUrl: string | null;
        backgroundColor: string | null;
        textColor: string | null;
        position: string;
        priority: number;
    }[]>;
    createAdvertisement(data: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        imageUrl: string;
        linkUrl: string | null;
        backgroundColor: string | null;
        textColor: string | null;
        position: string;
        priority: number;
    }>;
    updateAdvertisement(id: string, data: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        imageUrl: string;
        linkUrl: string | null;
        backgroundColor: string | null;
        textColor: string | null;
        position: string;
        priority: number;
    }>;
    deleteAdvertisement(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getContent(): Promise<any>;
    updateContent(content: any): Promise<{
        success: boolean;
        message: string;
    }>;
    createManualBooking(data: any): Promise<{
        success: boolean;
        booking: {
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
        };
        message: string;
    }>;
    getRefunds(status?: string): Promise<({
        booking: {
            user: {
                name: string;
                email: string;
            };
            flight: {
                flightNumber: string;
                arrivalAirport: {
                    iata: string;
                    city: string;
                } | null;
                departureAirport: {
                    iata: string;
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
        };
    } & {
        id: string;
        createdAt: Date;
        status: string;
        userId: string;
        reason: string | null;
        bookingId: string;
        requestDate: Date;
        originalAmount: number;
        penaltyAmount: number;
        refundAmount: number;
        adminNotes: string | null;
        processedAt: Date | null;
        expertReviewerName: string | null;
        expertReviewDate: Date | null;
        financialReviewerName: string | null;
        financialReviewDate: Date | null;
        paymentProcessorName: string | null;
        paymentDate: Date | null;
        rejecterName: string | null;
        rejectionDate: Date | null;
        rejectionReason: string | null;
    })[]>;
    updateRefund(refundId: string, body: {
        action: string;
        reason?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        userId: string;
        reason: string | null;
        bookingId: string;
        requestDate: Date;
        originalAmount: number;
        penaltyAmount: number;
        refundAmount: number;
        adminNotes: string | null;
        processedAt: Date | null;
        expertReviewerName: string | null;
        expertReviewDate: Date | null;
        financialReviewerName: string | null;
        financialReviewDate: Date | null;
        paymentProcessorName: string | null;
        paymentDate: Date | null;
        rejecterName: string | null;
        rejectionDate: Date | null;
        rejectionReason: string | null;
    }>;
    getExpenses(startDate?: string, endDate?: string): Promise<({
        account: {
            id: string;
            name: string;
            balance: number;
            currency: string;
            code: string | null;
            type: import(".prisma/client").$Enums.AccountType;
            parentId: string | null;
            isParent: boolean;
        };
        recordedBy: {
            name: string;
        };
    } & {
        id: string;
        currency: string;
        description: string;
        amount: number;
        date: Date;
        accountId: string;
        recordedByUserId: string;
    })[]>;
    createExpense(data: any): Promise<{
        account: {
            id: string;
            name: string;
            balance: number;
            currency: string;
            code: string | null;
            type: import(".prisma/client").$Enums.AccountType;
            parentId: string | null;
            isParent: boolean;
        };
        recordedBy: {
            name: string;
        };
    } & {
        id: string;
        currency: string;
        description: string;
        amount: number;
        date: Date;
        accountId: string;
        recordedByUserId: string;
    }>;
    getChartOfAccounts(): Promise<({
        children: {
            id: string;
            name: string;
            balance: number;
            currency: string;
            code: string | null;
            type: import(".prisma/client").$Enums.AccountType;
            parentId: string | null;
            isParent: boolean;
        }[];
        parent: {
            id: string;
            name: string;
            balance: number;
            currency: string;
            code: string | null;
            type: import(".prisma/client").$Enums.AccountType;
            parentId: string | null;
            isParent: boolean;
        } | null;
    } & {
        id: string;
        name: string;
        balance: number;
        currency: string;
        code: string | null;
        type: import(".prisma/client").$Enums.AccountType;
        parentId: string | null;
        isParent: boolean;
    })[]>;
    createAccount(data: any): Promise<{
        id: string;
        name: string;
        balance: number;
        currency: string;
        code: string | null;
        type: import(".prisma/client").$Enums.AccountType;
        parentId: string | null;
        isParent: boolean;
    }>;
    updateAccount(accountId: string, data: any): Promise<{
        id: string;
        name: string;
        balance: number;
        currency: string;
        code: string | null;
        type: import(".prisma/client").$Enums.AccountType;
        parentId: string | null;
        isParent: boolean;
    }>;
    getTelegramConfig(): Promise<{
        isEnabled: boolean;
        botToken: string;
        chatId: string;
        notifyOn: {
            newBooking: boolean;
            bookingCancellation: boolean;
            refundUpdate: boolean;
            newUser: boolean;
            newTicket: boolean;
        };
    }>;
    updateTelegramConfig(config: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getWhatsAppConfig(): Promise<{
        isEnabled: boolean;
        apiKey: string;
        phoneNumberId: string;
        notifyOn: {
            bookingSuccess: boolean;
            flightChange: boolean;
        };
    }>;
    updateWhatsAppConfig(config: any): Promise<{
        success: boolean;
        message: string;
    }>;
}
