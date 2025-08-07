import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';

export interface BookingSummaryData {
  travelers: number;
  packageId: number;
  availabilityId: number;
  packageTitle: string;
}

export interface BookingPricing {
  passagemIda: number;
  passagemVolta: number;
  servicos: number;
  baseTotal: number;
  discount?: number;
  finalTotal: number;
}

export interface ICurrentFlight {
  departure: IFlight;
  arrival: IFlight;
}

export interface IFlight {
  id: number;
  airline: string;
  flightNumber: string;
  departureDatetime: string;
  arrivalDatetime: string;
  originAirport: string;
  destinationAirport: string;
  flightClass: string;
  flightPrice: number;
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
   * Validate and apply coupon code
   */
  applyCoupon(couponCode: string, currentTotal: number): Observable<{ success: boolean, discountPercent: number, message: string }> {
    this.loadingSubject.next(true);

    return new Observable(observer => {
      this.http.get<any>(`${this.API_BASE_URL}/payments/validate-coupon`, {
        params: { code: couponCode }
      }).subscribe({
        next: (response) => {
          observer.next({
            success: true,
            discountPercent: response.discountPercent || 0,
            message: response.message || 'Cupom aplicado com sucesso'
          });
          this.completeLoading();
          observer.complete();
        },
        error: (error) => {
          observer.next({
            success: false,
            discountPercent: 0,
            message: error.error?.message || 'Código de cupom inválido'
          });
          this.completeLoading();
          observer.complete();
        }
      });
    });
  }

  private completeLoading(): void {
    setTimeout(() => this.loadingSubject.next(false), 100);
  }
}
