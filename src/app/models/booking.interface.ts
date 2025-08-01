import { ITraveler } from "./traveler.interface";

export interface IBooking {
  mainTraveler: ITraveler;
  otherTravelers: ITraveler[];
  specialRequest?: string;
  paymentMethod: string;
  couponCode?: string;
  appliedDiscount: number;
  totalAmount: number;
}