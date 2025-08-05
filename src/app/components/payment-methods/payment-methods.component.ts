import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IPaymentMethod } from '../../models/payment-method.interface';

@Component({
  selector: 'app-payment-methods',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css']
})
export class PaymentMethodsComponent {
  @Input() selectedPaymentMethod: string = '';
  @Output() paymentMethodChange = new EventEmitter<string>();
  @Output() continuePayment = new EventEmitter<void>();

  paymentMethods = [
    { id: 'pix', name: 'Pagar com PIX', icon: 'pix' },
    { id: 'credit', name: 'Pagar com cartão de crédito', icon: 'credit-card' },
    { id: 'debit', name: 'Pagar com cartão de débito', icon: 'debit-card' }
  ];

  totalAmount = 17700.00;

  selectPaymentMethod(methodId: string): void {
    this.paymentMethodChange.emit(methodId);
  }

  onContinue(): void {
    if (this.selectedPaymentMethod) {
      this.continuePayment.emit();
    }
  }

  getSelectedMethodName(): string {
    const method = this.paymentMethods.find(m => m.id === this.selectedPaymentMethod);
    return method ? method.name.replace('Pagar com ', '').toUpperCase() : '';
  }
}