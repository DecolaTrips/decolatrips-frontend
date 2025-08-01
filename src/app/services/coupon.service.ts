import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { ICoupon, ICouponMessage } from '../models/coupon.interface';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private validCoupons: Record<string, Omit<ICoupon, 'code' | 'isValid'>> = {
    'DESCONTO10': { discount: 10, type: 'percentage' },
    'SAVE500': { discount: 500, type: 'fixed' },
    'WELCOME': { discount: 5, type: 'percentage' },
    'BLACKFRIDAY': { discount: 15, type: 'percentage' },
    'PRIMEIRAVIAGEM': { discount: 200, type: 'fixed' }
  };

  validateCoupon(code: string, subtotal: number): Observable<{ coupon: ICoupon | null; message: ICouponMessage }> {
    return of(null).pipe(
      delay(800), // simula requisição à API
      map(() => {
        const couponData = this.validCoupons[code.toUpperCase()];
        
        if (!couponData) {
          return {
            coupon: null,
            message: {
              text: 'Cupom inválido ou expirado.',
              success: false
            }
          };
        }

        const coupon: ICoupon = {
          code: code.toUpperCase(),
          ...couponData,
          isValid: true
        };

        const discountText = couponData.type === 'percentage' 
          ? `${couponData.discount}%` 
          : `R$ ${couponData.discount.toFixed(2).replace('.', ',')}`;

        return {
          coupon,
          message: {
            text: `Cupom aplicado com sucesso! Desconto de ${discountText}`,
            success: true
          }
        };
      })
    );
  }

  calculateDiscount(coupon: ICoupon, subtotal: number): number {
    if (!coupon.isValid) return 0;
    
    if (coupon.type === 'percentage') {
      return subtotal * (coupon.discount / 100);
    } else {
      return coupon.discount;
    }
  }

  getAvailableCoupons(): string[] {
    return Object.keys(this.validCoupons);
  }
}