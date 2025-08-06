import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
    Footer
  ],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  readonly paymentMethods = signal<IPaymentMethod[]>([]);
  readonly paymentDiscount = signal<number>(0);
  readonly isProcessingBooking = signal<boolean>(false);
  readonly showBrick = signal<boolean>(true);
  readonly paymentAmount = signal<number>(19698);
  readonly travelersSetFromSearch = signal<boolean>(false); // Track if travelers were set from URL params
  readonly bookingSearchData = signal<any>(null); // Store search data for booking summary

  readonly baseValues: IBookingValues = {
    passagemIda: 1999.00,
    passagemVolta: 2999.00,
    hotel: 14000.00,
    taxas: 700.00
  };

  constructor(
    readonly checkoutService: CheckoutService,
    private paymentService: PaymentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadPaymentMethods();
    this.initializeFromUrlParams();
  }

  private initializeFromUrlParams(): void {
    this.route.queryParams.subscribe(params => {
      const adults = parseInt(params['adults']) || 1;
      const children = parseInt(params['children']) || 0;
      const destination = params['destination'] || '';
      
      this.travelersSetFromSearch.set(true);
      
      const totalTravelers = adults + children;
      const otherTravelersCount = Math.max(0, totalTravelers - 1);
      
      console.log('URL Params:', { adults, children, destination, totalTravelers, otherTravelersCount });
      
      const packageTitle = params['packageTitle'];
      const packagePrice = params['packagePrice'];
      
      // Store search data for booking summary API calls
      if (destination || packageTitle) {
        const searchData = {
          destination: destination,
          adults: adults,
          children: children,
          packageId: params['packageId'],
          packageTitle: packageTitle || destination,
          departureDate: params['departureDate'],
          returnDate: params['returnDate']
        };
        this.bookingSearchData.set(searchData);
      }
      
      if (otherTravelersCount > 0) {
        this.initializeOtherTravelers(adults, children);
      }
      
      if (packageTitle) {
        console.log('Selected package:', { packageTitle, packagePrice });
      }
    });
  }

  private initializeOtherTravelers(adults: number, children: number): void {
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
    
    for (let i = 0; i < children; i++) {
      travelers.push({
        id: travelerId++,
        name: '',
        email: '',
        document: '',
        phone: '',
        type: 'child'
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
    // Handle updated pricing from API
    console.log('Pricing updated from API:', pricing);
    // You can update the paymentAmount or other relevant signals here
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
    const booking = this.checkoutService.createBooking(this.baseValues);

    this.paymentService.processPayment(booking)
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
}