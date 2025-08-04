import { ITraveler } from "./traveler.interface";

export interface IBooking {
  mainTraveler: ITraveler;
  otherTravelers: ITraveler[];
  specialRequest?: string;
  couponCode?: string;
  appliedDiscount: number;
  totalAmount: number;
}