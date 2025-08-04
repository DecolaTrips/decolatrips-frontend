export interface AvailabilityCreate {
  
  dateIn: string; // ISO format: "2025-08-10"
  dateOut: string;
  price: number;
  vacancyAvailability?: number;
  status?: string;
    
}
