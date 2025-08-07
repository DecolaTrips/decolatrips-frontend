import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { IBookingValues } from '../../models/booking-values.interface';
import { ICouponMessage } from '../../models/coupon.interface';
import { BookingApiService, BookingSummaryData, BookingPricing, ICurrentFlight } from '../../services/booking-api.service';
import { AvailabilityService } from '../../services/availabilityService';

@Component({
  selector: 'app-booking-summary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-summary.component.html'
})
export class BookingSummaryComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  @Input() baseValues!: IBookingValues;
  @Input() appliedDiscount: number = 0;
  @Input() paymentDiscount: number = 0;
  @Input() travelers: number = 1;
  @Input() isFormValid: boolean = false;
  @Input() isProcessing: boolean = false;

  // New inputs for API integration
  @Input() searchData: BookingSummaryData | null = null;
  @Input() autoRefresh: boolean = true; // Whether to auto-refresh pricing when inputs change

  @Output() finalizeBookingRequest = new EventEmitter<void>();
  @Output() pricingUpdated = new EventEmitter<BookingPricing>();

  // Reactive state
  readonly isLoadingPricing = signal<boolean>(false);
  readonly apiPricing = signal<BookingPricing | null>(null);
  readonly packageDetails = signal<any>(null);
  readonly flight = signal<ICurrentFlight>(
    {
      departure: { id: 0, airline: '', flightNumber: '', departureDatetime: '', arrivalDatetime: '', originAirport: '', destinationAirport: '', flightClass: '', flightPrice: 0 },
      arrival: { id: 0, airline: '', flightNumber: '', departureDatetime: '', arrivalDatetime: '', originAirport: '', destinationAirport: '', flightClass: '', flightPrice: 0 }
    });

  // cupom
  couponCode: string = '';
  couponMessage: ICouponMessage | null = null;
  isApplying: boolean = false;

  constructor(private bookingApiService: BookingApiService, private availabilityService: AvailabilityService) { }

  ngOnInit(): void {
    // Subscribe to API loading state
    this.bookingApiService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => this.isLoadingPricing.set(loading));

    // Auto-refresh pricing if search data is provided
    if (this.autoRefresh && this.searchData) {
      this.refreshPricing();

    }
  }

  ngOnChanges(): void {
    if (this.autoRefresh && this.searchData) {
      this.refreshPricing();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  refreshPricing(discount: number = 0): void {
    if (!this.searchData) return;

    console.log('Refreshing pricing with search data:', this.searchData);

    this.availabilityService.getAvailabilitiesById(this.searchData.packageId, this.searchData.availabilityId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        let responseData: BookingPricing = {
          passagemIda: data.flights[0].flightPrice,
          passagemVolta: data.flights[1].flightPrice,
          servicos: data.price,
          baseTotal: data.price + data.flights[0].flightPrice + data.flights[1].flightPrice,
          finalTotal: (data.price + data.flights[0].flightPrice + data.flights[1].flightPrice) * this.searchData!.travelers,
        };

        if (discount > 0) {
          responseData.discount = discount;
          responseData.finalTotal -= (responseData.finalTotal * discount / 100);
        }

        this.flight.set({
          departure: data.flights[0],
          arrival: data.flights[1]
        })
        this.apiPricing.set(responseData);
        this.pricingUpdated.emit(responseData);
      });
  }

  /**
   * Get the current pricing data (from API if available, fallback to input values)
   */
  getCurrentPricing(): IBookingValues {
    const apiData = this.apiPricing();
    if (apiData) {
      return {
        passagemIda: apiData.passagemIda,
        passagemVolta: apiData.passagemVolta,
        servicos: apiData.servicos,
      };
    }
    return this.baseValues;
  }

  getTotal(): number {
    const pricing = this.getCurrentPricing();
    let baseTotal = (pricing.passagemIda +
      pricing.passagemVolta +
      pricing.servicos) * this.travelers;

    if (this.appliedDiscount > 0) {
      baseTotal = baseTotal - (baseTotal * this.appliedDiscount / 100);
    }
    return baseTotal;
  }

  applyCoupon(): void {
    if (!this.couponCode.trim()) return;

    this.isApplying = true;
    this.couponMessage = null;

    // Use API service for coupon validation
    this.bookingApiService.applyCoupon(this.couponCode, this.apiPricing()!.finalTotal)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.couponMessage = {
            text: response.message,
            success: response.success
          };

          if (response.success) {
            this.appliedDiscount = response.discountPercent;
            this.refreshPricing(this.appliedDiscount);
          }

          this.isApplying = false;
        },
        error: (error) => {
          this.couponMessage = {
            text: 'Erro ao validar cupom. Tente novamente.',
            success: false
          };
          this.isApplying = false;
        }
      });
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