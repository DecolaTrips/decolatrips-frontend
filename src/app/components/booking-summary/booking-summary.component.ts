import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { IBookingValues } from '../../models/booking-values.interface';
import { ICouponMessage } from '../../models/coupon.interface';
import { BookingApiService, BookingSummaryData, BookingPricing } from '../../services/booking-api.service';

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

  // cupom
  couponCode: string = '';
  couponMessage: ICouponMessage | null = null;
  isApplying: boolean = false;

  constructor(private bookingApiService: BookingApiService) {}

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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Refresh pricing from API based on current search data
   */
  refreshPricing(): void {
    if (!this.searchData) return;

    this.bookingApiService.getBookingPricing(this.searchData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.apiPricing.set(response.data);
            this.packageDetails.set(response.packageDetails);
            this.pricingUpdated.emit(response.data);
          }
        },
        error: (error) => {
          console.error('Error fetching pricing:', error);
        }
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
        hotel: apiData.hotel,
        taxas: apiData.taxas
      };
    }
    return this.baseValues;
  }

  getTotal(): number {
    const pricing = this.getCurrentPricing();
    const baseTotal = pricing.passagemIda + 
                     pricing.passagemVolta + 
                     pricing.hotel + 
                     pricing.taxas;
    
    return baseTotal - this.appliedDiscount - this.paymentDiscount;
  }

  applyCoupon(): void {
    if (!this.couponCode.trim()) return;
    
    this.isApplying = true;
    this.couponMessage = null;

    // Use API service for coupon validation
    const currentTotal = this.getTotal();
    this.bookingApiService.applyCoupon(this.couponCode, currentTotal)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.couponMessage = {
            text: response.message,
            success: response.success
          };
          
          if (response.success) {
            // You can emit this discount to parent component if needed
            // this.discountApplied.emit(response.discount);
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