import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

// Components
import { TravelerFormComponent } from '../../components/traveler-form/traveler-form.component';
import { OtherTravelersComponent } from '../../components/other-travelers/other-travelers.component';
import { SpecialRequestComponent } from '../../components/special-request/special-request.component';
import { BookingSummaryComponent } from '../../components/booking-summary/booking-summary.component';
import { NavbarComponent } from '../../shared/components/navbar-t2/navbar.component';
import { Footer } from '../../components/footer/footer';
import { MercadopagoPaymentComponent } from '../../components/mercadopago-payment.component/mercadopago-payment.component';

// Services
import { CheckoutService } from '../../services/checkout.service';
import { PaymentService } from '../../services/payment.service';

// Interfaces
import { ITraveler } from '../../models/traveler.interface';
import { IPaymentMethod } from '../../models/payment-method.interface';
import { IBookingValues } from '../../models/booking-values.interface';
import { AvailabilityService } from '../../services/availabilityService';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    TravelerFormComponent,
    OtherTravelersComponent,
    SpecialRequestComponent,
    BookingSummaryComponent,
    NavbarComponent,
    MercadopagoPaymentComponent,
    Footer,
    RouterModule
  ],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  readonly paymentMethods = signal<IPaymentMethod[]>([]);
  readonly paymentDiscount = signal<number>(0);
  readonly isProcessingBooking = signal<boolean>(false);
  readonly showBrick = signal<boolean>(true);
  readonly paymentAmount = signal<number>(0);
  readonly travelersSetFromSearch = signal<boolean>(false); // Track if travelers were set from URL params
  readonly bookingSearchData = signal<any>(null); // Store search data for booking summary

  bookingValues: IBookingValues = {
    passagemIda: 0,
    passagemVolta: 0,
    servicos: 0
  };

  constructor(
    readonly checkoutService: CheckoutService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPaymentMethods();
    this.initializeFromUrlParams();
    window.scrollTo(0, 0);
  }

  private initializeFromUrlParams(): void {
    this.route.queryParams.subscribe(params => {
      const travelersCount = parseInt(params['travelers']) || 1;
      const packageTitle = params['packageTitle'] || '';
      const availabilityId = parseInt(params['availabilityId']) || -1;
      const packageId = parseInt(params['packageId']) || -1;

      this.travelersSetFromSearch.set(true);

      console.log('URL Params:', { packageId: packageId, travelers: travelersCount, availabilityId: availabilityId });

      if (availabilityId === -1) {
        console.warn('Availability ID not found in URL params');
        return;
      }

      if (packageId === -1) {
        console.warn('Package ID not found in URL params');
        return;
      }

      const otherTravelersCount = Math.max(0, travelersCount - 1);

      const searchData = {
        travelers: travelersCount,
        availabilityId: availabilityId,
        packageId: packageId,
        packageTitle: packageTitle
      };

      this.bookingSearchData.set(searchData);

      if (otherTravelersCount > 0) {
        this.initializeOtherTravelers(travelersCount);
      }
    });
  }

  private initializeOtherTravelers(adults: number): void {
    const travelers: ITraveler[] = [];
    let travelerId = Date.now();

    const additionalAdults = Math.max(0, adults - 1);
    for (let i = 0; i < additionalAdults; i++) {
      travelers.push({
        id: travelerId++,
        name: '',
        email: '',
        document: '',
        phone: '',
        type: 'adult'
      } as ITraveler);
    }

    this.checkoutService.updateOtherTravelers(travelers);
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

  private resetForm(): void {
    this.paymentDiscount.set(0);
    this.isProcessingBooking.set(false);
    this.showBrick.set(false);
  }

  // Event handlers
  onMainTravelerChange(traveler: ITraveler): void {
    this.checkoutService.updateMainTraveler(traveler);
  }

  onOtherTravelersChange(travelers: ITraveler[]): void {
    this.checkoutService.updateOtherTravelers(travelers);
  }

  onSpecialRequestChange(request: string): void {
    this.checkoutService.updateSpecialRequest(request);
  }

  onPricingUpdated(pricing: any): void {
    console.log('Pricing updated from API:', pricing);
    this.paymentAmount.set(pricing.finalTotal);
  }

  onProceedToPayment(method: IPaymentMethod): void {
    console.log('Redirecionamento', `Redirecionando para o pagamento via ${method.name}...`);
  }

  onPaymentSuccess(paymentData: any): void {
    console.log('Pagamento realizado com sucesso', paymentData);
    this.onFinalizeBooking();
  }

  onPaymentError(error: any): void {
    console.error('Erro no pagamento', error);
    this.isProcessingBooking.set(false);
  }

  onFinalizeBooking(): void {
    this.isProcessingBooking.set(true);
    const booking = this.checkoutService.createBooking(this.bookingValues);

    this.paymentService.processPayment(booking)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          if (result.success) {
            console.log('Reserva Confirmada!', `Sua reserva foi finalizada com sucesso. ID da transação: ${result.transactionId}`);
            this.checkoutService.clearCheckoutData();
            this.resetForm();
            this.router.navigate(['/meus-pacotes']);
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
}
