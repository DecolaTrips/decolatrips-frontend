export interface ICoupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  isValid: boolean;
}

export interface ICouponMessage {
  text: string;
  success: boolean;
}