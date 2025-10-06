export { LoginDto } from './login.dto';
export declare class CreateExchangeRateDto {
    baseCurrencyId: string;
    targetCurrencyId: string;
    rate: number;
    source?: string;
}
export declare class UpdateExchangeRateDto {
    rate: number;
    source?: string;
}
export declare class SignupDto {
    name: string;
    username: string;
    email: string;
    password: string;
    phone: string;
}
export declare class UpdateProfileDto {
    name?: string;
    currentPassword?: string;
    newPassword?: string;
}
export declare class SavedPassengerDto {
    firstName: string;
    lastName: string;
    nationality: string;
    gender: string;
    nationalId?: string;
    passportNumber?: string;
}
export declare class PassengerDto {
    name: string;
    seatNumber?: string;
    ticketNumber?: string;
}
export declare class CreateBookingDto {
    flightId: string;
    passengers: PassengerDto[];
    totalPrice: number;
    contactEmail?: string;
    contactPhone?: string;
    buyerReference?: string;
    notes?: string;
    purchasePrice?: number;
    searchQuery?: string;
    sepehrBookingId?: string;
    sepehrPnr?: string;
    charter118BookingId?: string;
    charter118ConfirmationCode?: string;
}
export declare class CancelBookingDto {
    reason?: string;
}
export declare class CreateTicketDto {
    subject: string;
    message: string;
    bookingId?: string;
    priority?: 'LOW' | 'MEDIUM' | 'HIGH';
}
export declare class AddMessageDto {
    message: string;
}
export declare class UpdateUserDto {
    name?: string;
    role?: string;
    status?: string;
}
export declare class FlightSearchQueryDto {
    from: string;
    to: string;
    departureDate: string;
    adults?: string;
    children?: string;
    infants?: string;
    [key: string]: any;
}
declare class FlightLocationDto {
    [key: string]: any;
    airportId?: string;
    city?: string;
    airportCode?: string;
    terminal?: string;
    scheduledTime?: string;
    gate?: string;
}
declare class FlightAllotmentDto {
    [key: string]: any;
    flightClass?: string;
    seats?: number;
    price?: number;
}
export declare class CreateFlightDto {
    airline: string;
    airlineLogoUrl?: string;
    flightNumber: string;
    departure: FlightLocationDto;
    arrival: FlightLocationDto;
    duration?: number;
    stops?: number;
    price: number;
    taxes?: number;
    flightClass: string;
    aircraft: string;
    availableSeats?: number;
    totalCapacity?: number;
    baggageAllowance?: string;
    status?: string;
    bookingClosesBeforeDepartureHours?: number;
    sourcingType?: string;
    commissionModelId?: string;
    refundPolicyId?: string;
    allotments?: FlightAllotmentDto[];
}
export declare class UpdateFlightDto {
    [key: string]: any;
    airline?: string;
    airlineLogoUrl?: string;
    flightNumber?: string;
    departure?: FlightLocationDto;
    arrival?: FlightLocationDto;
    duration?: number;
    stops?: number;
    price?: number;
    taxes?: number;
    flightClass?: string;
    aircraft?: string;
    availableSeats?: number;
    totalCapacity?: number;
    baggageAllowance?: string;
    status?: string;
    bookingClosesBeforeDepartureHours?: number;
    sourcingType?: string;
    commissionModelId?: string;
    refundPolicyId?: string;
    allotments?: FlightAllotmentDto[];
}
export * from './flight.dto';
export * from './login.dto';
export * from './update-user.dto';
export * from './wallet.dto';
export * from './refresh.dto';
export * from './sepehr.dto';
export declare class CreateAdvertisementDto {
    title: string;
    description?: string;
    imageUrl: string;
    linkUrl?: string;
    backgroundColor?: string;
    textColor?: string;
    position?: string;
    priority?: number;
    isActive?: boolean;
}
export declare class UpdateAdvertisementDto {
    title?: string;
    description?: string;
    imageUrl?: string;
    linkUrl?: string;
    backgroundColor?: string;
    textColor?: string;
    position?: string;
    priority?: number;
    isActive?: boolean;
}
