import { ITraveler } from "./traveler.interface";

export interface CreateReservationDTO {
    clientId: number;
    availabilityId: number;
    travelers: ReservationTraveler[];
    price: number;
}

export interface ReservationTraveler {
    travelerName: string | null;
    iddDocument: string | null;
    dateOfBirth: string | null;
    telephone: string | null;
    email: string | null;
}