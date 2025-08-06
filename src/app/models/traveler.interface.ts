export interface ITraveler {
  id: number;
  name: string;
  email: string;
  document: string;
  phone?: string;
  type?: 'adult' | 'child'; // Optional field to distinguish between adults and children
}