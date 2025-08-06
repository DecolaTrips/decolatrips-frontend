import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { IPaymentMethod } from '../models/payment-method.interface';
import { IBooking } from '../models/booking.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentMethods: IPaymentMethod[] = [
    {
      id: 'pix',
      name: 'Pagar com PIX',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" class="size-5 text-indigo-600"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
      description: 'Pagamento instantâneo via PIX. Você receberá um QR Code para finalizar o pagamento.'
    },
    {
      id: 'credit',
      name: 'Pagar com cartão de crédito',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" class="size-5 text-indigo-600"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>',
      description: 'Parcelamento em até 12x sem juros. Aceitamos as principais bandeiras: Visa, Mastercard, American Express.'
    },
    {
      id: 'debit',
      name: 'Pagar com cartão de débito',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" class="size-5 text-indigo-600"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>',
      description: 'Débito direto na conta. Pagamento à vista com desconto especial de 3%.',
      discount: 3
    }
  ];

  getPaymentMethods(): Observable<IPaymentMethod[]> {
    return of(this.paymentMethods).pipe(delay(300));
  }

  processPayment(booking: IBooking): Observable<{ success: boolean; transactionId?: string; error?: string }> {
    // simula processamento de pagamento
    return of(null).pipe(
      delay(2000),
      map(() => {
        const success = Math.random() > 0.05;
        
        if (success) {
          return {
            success: true,
            transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
          };
        } else {
          return {
            success: false,
            error: 'Falha no processamento do pagamento. Tente novamente.'
          };
        }
      })
    );
  }

  calculatePaymentDiscount(paymentMethod: IPaymentMethod, subtotal: number): number {
    if (paymentMethod.discount) {
      return subtotal * (paymentMethod.discount / 100);
    }
    return 0;
  }
}