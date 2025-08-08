import { PackageMedia } from "./package-media";
import { ReservationTraveler } from "./reservation.model";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  alt: string;
  link?: string;
}

export interface BookedPackage {
  idReservation: number;
  travelPackageTitle: string;
  travelers: ReservationTraveler[];
  totalValor: number;
  travelPackageImageUrl: PackageMedia;
  status: 'Confirmada' | 'Pendente' | 'Cancelado';
  dateIn: Date;
  dateOut: Date;
  dateReservation: Date;
}