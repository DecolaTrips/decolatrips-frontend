export interface IPaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
  discount?: number;
}