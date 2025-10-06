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
