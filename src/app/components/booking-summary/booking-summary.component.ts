import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IBookingValues } from '../../models/booking-values.interface';
import { ICouponMessage } from '../../models/coupon.interface';

@Component({
  selector: 'app-booking-summary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-summary.component.html'
})
export class BookingSummaryComponent {
  @Input() baseValues!: IBookingValues;
  @Input() appliedDiscount: number = 0;
  @Input() paymentDiscount: number = 0;
  @Input() travelers: number = 1;
  @Input() isFormValid: boolean = false;
  @Input() isProcessing: boolean = false;

  @Output() finalizeBookingRequest = new EventEmitter<void>();

  // cupom
  couponCode: string = '';
  couponMessage: ICouponMessage | null = null;
  isApplying: boolean = false;

  getTotal(): number {
    const baseTotal = this.baseValues.passagemIda + 
                     this.baseValues.passagemVolta + 
                     this.baseValues.hotel + 
                     this.baseValues.taxas;
    
    return baseTotal - this.appliedDiscount - this.paymentDiscount;
  }

  applyCoupon(): void {
    if (!this.couponCode.trim()) return;
    
    this.isApplying = true;
    this.couponMessage = null;

    // pra testar simulacao api
    setTimeout(() => {
      if (this.couponCode.toLowerCase() === 'desconto10') {
        this.couponMessage = {
          text: 'Cupom aplicado com sucesso! Desconto de R$ 100,00',
          success: true
        };
      } else {
        this.couponMessage = {
          text: 'Código de cupom inválido',
          success: false
        };
      }
      this.isApplying = false;
    }, 1000);
  }

  finalizeBooking(): void {
    if (!this.isFormValid) {
      this.couponMessage = {
        text: 'Por favor, complete todos os campos obrigatórios antes de finalizar a reserva.',
        success: false
      };
      return;
    }
    
    this.finalizeBookingRequest.emit();
  }

  showCancellationPolicy(): void {
    // alerta do cancelamento de quartos
 alert('Política de Cancelamento:\n\n• Cancelamento gratuito até 24h antes do check-in\n• Cancelamento com taxa de 50% entre 24h e 12h antes do check-in\n• Não há reembolso para cancelamentos com menos de 12h');
  }
}