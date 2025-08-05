import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

// Componentes
import { TravelerFormComponent } from '../../components/traveler-form/traveler-form.component';
import { OtherTravelersComponent } from '../../components/other-travelers/other-travelers.component';
import { SpecialRequestComponent } from '../../components/special-request/special-request.component';
import { BookingSummaryComponent } from '../../components/booking-summary/booking-summary.component';
import { PaymentMethodsComponent } from '../../components/payment-methods/payment-methods.component';
import { NavbarComponent } from '../../shared/components/navbar-t2/navbar.component';
import { Footer } from '../../components/footer/footer';

// Serviços
import { CheckoutService } from '../../services/checkout.service';
import { PaymentService } from '../../services/payment.service';

// Interfaces
import { ITraveler } from '../../models/traveler.interface';
import { IPaymentMethod } from '../../models/payment-method.interface';
import { IBookingValues } from '../../models/booking-values.interface';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    TravelerFormComponent,
    OtherTravelersComponent,
    SpecialRequestComponent,
    BookingSummaryComponent,
    PaymentMethodsComponent,
    NavbarComponent,
    Footer
  ],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Signals para estado local
  readonly paymentMethods = signal<IPaymentMethod[]>([]);
  readonly paymentDiscount = signal<number>(0);
  readonly isProcessingBooking = signal<boolean>(false);

  // Valores base da reserva
  readonly baseValues: IBookingValues = {
    passagemIda: 1999.00,
    passagemVolta: 2999.00,
    hotel: 14000.00,
    taxas: 700.00
  };

  constructor(
    readonly checkoutService: CheckoutService,
    private paymentService: PaymentService
    // private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadPaymentMethods();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadPaymentMethods(): void {
    this.paymentService.getPaymentMethods()
      .pipe(takeUntil(this.destroy$))
      .subscribe(methods => {
        this.paymentMethods.set(methods);
      });
  }

  // event handlers
  onMainTravelerChange(traveler: ITraveler): void {
    this.checkoutService.updateMainTraveler(traveler);
  }

  onOtherTravelersChange(travelers: ITraveler[]): void {
    this.checkoutService.updateOtherTravelers(travelers);
  }

  onSpecialRequestChange(request: string): void {
    this.checkoutService.updateSpecialRequest(request);
  }

  onPaymentMethodChange(methodId: string): void {
    this.checkoutService.updateSelectedPaymentMethod(methodId);
    
    // só pra testar 
    const method = this.paymentMethods().find(m => m.id === methodId);
    if (method) {
      const discount = this.paymentService.calculatePaymentDiscount(method, this.getSubtotal());
      this.paymentDiscount.set(discount);
    } else {
      this.paymentDiscount.set(0);
    }
  }

  onContinuePayment(): void {
    if (this.checkoutService.selectedPaymentMethod()) {
      console.log('Redirecionamento', 'Redirecionando para a página de pagamento...');
      // gateway de pagamento depois
    }
  }

  onProceedToPayment(method: IPaymentMethod): void {
    console.log('Redirecionamento', `Redirecionando para o pagamento via ${method.name}...`);
  }

  onFinalizeBooking(): void {
    if (!this.checkoutService.isFormValid()) {
      console.error('Formulário Incompleto', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    this.isProcessingBooking.set(true);
    const booking = this.checkoutService.createBooking(this.baseValues);
    const selectedMethod = this.paymentMethods().find(m => m.id === booking.paymentMethod);

    if (!selectedMethod) {
      console.error('Erro no Pagamento', 'Método de pagamento não encontrado.');
      this.isProcessingBooking.set(false);
      return;
    }

    this.paymentService.processPayment(booking, selectedMethod)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          if (result.success) {
            console.log('Reserva Confirmada!', `Sua reserva foi finalizada com sucesso. ID da transação: ${result.transactionId}`);
            this.checkoutService.clearCheckoutData();
            this.resetForm();
          } else {
            console.error('Falha no Pagamento', result.error || 'Ocorreu um erro ao processar o pagamento.');
          }
          this.isProcessingBooking.set(false);
        },
        error: () => {
          console.error('Erro no Sistema', 'Ocorreu um erro interno. Tente novamente mais tarde.');
          this.isProcessingBooking.set(false);
        }
      });
  }

  private getSubtotal(): number {
    return this.baseValues.passagemIda + 
           this.baseValues.passagemVolta + 
           this.baseValues.hotel + 
           this.baseValues.taxas;
  }

  private resetForm(): void {
    this.paymentDiscount.set(0);
    this.isProcessingBooking.set(false);
  }
}