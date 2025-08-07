export interface IPaymentRequest {
  amount: number;
  description: string;
  paymentMethod: string;
  paymentToken: string;
  payerEmail: string;
  payerIdentificationType: string;
  payerIdentificationNumber: string;
  installments?: number;
}
