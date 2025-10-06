export declare class SepehrFlightSearchDto {
    departureCity: string;
    arrivalCity: string;
    departureDate: string;
    adults: number;
    children: number;
    infants: number;
    cabinClass?: string;
}
export declare class SepehrPassengerDto {
    firstName: string;
    lastName: string;
    gender: 'male' | 'female';
    birthDate: string;
    nationality: string;
}
export declare class SepehrContactInfoDto {
    email: string;
    phone: string;
}
export declare class SepehrPaymentInfoDto {
    method: string;
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
}
export declare class SepehrBookingDto {
    flightId: string;
    passengers: SepehrPassengerDto[];
    contactInfo: SepehrContactInfoDto;
    paymentInfo?: SepehrPaymentInfoDto;
}
