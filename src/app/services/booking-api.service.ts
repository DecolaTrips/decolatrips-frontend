import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';

export interface BookingSummaryData {
  destination: string;
  adults: number;
  children: number;
  packageId?: string;
  packageTitle?: string;
  departureDate?: string;
  returnDate?: string;
}

export interface BookingPricing {
  passagemIda: number;
  passagemVolta: number;
  hotel: number;
  taxas: number;
  baseTotal: number;
  discount?: number;
  finalTotal: number;
}

export interface BookingApiResponse {
  success: boolean;
  data: BookingPricing;
  packageDetails?: {
    title: string;
    destination: string;
    duration: string;
    inclusions: string[];
  };
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingApiService {
  private readonly API_BASE_URL = 'http://localhost:8080/api'; // Change this to your actual API URL
  
  // BehaviorSubject to track loading state
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Get booking pricing based on search parameters
   * This will call your API when it's ready, currently returns mock data
   */
  getBookingPricing(searchData: BookingSummaryData): Observable<BookingApiResponse> {
    this.loadingSubject.next(true);
    
    // TODO: Replace this with actual API call when your API is ready
    // return this.http.post<BookingApiResponse>(`${this.API_BASE_URL}/booking/pricing`, searchData);
    
    // Mock implementation for now
    return this.getMockBookingPricing(searchData);
  }

  /**
   * Validate and apply coupon code
   */
 applyCoupon(couponCode: string, currentTotal: number): Observable<{ success: boolean, discount: number, message: string }> {
  this.loadingSubject.next(true);

  return new Observable(observer => {
    this.http.get<any>(`${this.API_BASE_URL}/payments/validate-coupon`, {
      params: { code: couponCode }
    }).subscribe({
      next: (response) => {
        observer.next({
          success: true,
          discount: response.discount || 0,
          message: response.message || 'Cupom aplicado com sucesso'
        });
        this.completeLoading();
        observer.complete();
      },
      error: (error) => {
        observer.next({
          success: false,
          discount: 0,
          message: error.error?.message || 'Código de cupom inválido'
        });
        this.completeLoading();
        observer.complete();
      }
    });
  });
}

  /**
   * Mock implementation - remove this when your API is ready
   */
  private getMockBookingPricing(searchData: BookingSummaryData): Observable<BookingApiResponse> {
    const mockResponse: BookingApiResponse = {
      success: true,
      data: {
        passagemIda: this.calculateFlightPrice(searchData.destination, 'ida'),
        passagemVolta: this.calculateFlightPrice(searchData.destination, 'volta'),
        hotel: this.calculateHotelPrice(searchData.adults, searchData.children),
        taxas: 700 + (searchData.adults + searchData.children - 1) * 100, // Base tax + per person
        baseTotal: 0, // Will be calculated
        finalTotal: 0 // Will be calculated
      },
      packageDetails: {
        title: searchData.packageTitle || searchData.destination,
        destination: searchData.destination,
        duration: '7 dias / 6 noites',
        inclusions: ['Hospedagem', 'Café da manhã', 'Passagens aéreas', 'Taxas incluídas']
      }
    };

    // Calculate totals
    mockResponse.data.baseTotal = mockResponse.data.passagemIda + 
                                 mockResponse.data.passagemVolta + 
                                 mockResponse.data.hotel + 
                                 mockResponse.data.taxas;
    mockResponse.data.finalTotal = mockResponse.data.baseTotal;

    return of(mockResponse).pipe(
      delay(800), // Simulate API delay
      catchError(error => {
        this.loadingSubject.next(false);
        return of({
          success: false,
          data: mockResponse.data,
          error: 'Failed to fetch pricing'
        });
      }),
      // Complete loading state
      delay(100) // Small delay to show loading state
    ).pipe(
      catchError(error => {
        this.loadingSubject.next(false);
        throw error;
      })
    );
  }

  

  private calculateFlightPrice(destination: string, direction: 'ida' | 'volta'): number {
    const basePrice = direction === 'ida' ? 1500 : 2000;
    const destinationMultiplier = this.getDestinationMultiplier(destination);
    return Math.round(basePrice * destinationMultiplier);
  }

  private calculateHotelPrice(adults: number, children: number): number {
    const baseHotelPrice = 12000; // Base price for 2 adults
    const additionalAdultPrice = 3000;
    const childPrice = 1500;
    
    const additionalAdults = Math.max(0, adults - 2);
    return baseHotelPrice + (additionalAdults * additionalAdultPrice) + (children * childPrice);
  }

  private getDestinationMultiplier(destination: string): number {
    const multipliers: {[key: string]: number} = {
      'egito': 1.8,
      'japao': 2.2,
      'toquio': 2.2,
      'paris': 1.9,
      'franca': 1.9,
      'bali': 1.6,
      'indonesia': 1.6,
      'patagonia': 1.4,
      'argentina': 1.4,
      'brasil': 0.8,
      'rio': 0.7,
      'porto': 0.6
    };

    const key = destination.toLowerCase();
    return multipliers[key] || 1.2; // Default multiplier
  }

  private completeLoading(): void {
    setTimeout(() => this.loadingSubject.next(false), 100);
  }
}
