export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  alt: string;
  link?: string;
}

export interface BookedPackage {
  id: number;
  destination: string;
  travelers: number;
  price: number;
  image: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookingDate: Date;
  travelDate: Date;
  paymentMethod: string;
}