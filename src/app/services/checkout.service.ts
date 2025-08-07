import { Injectable, signal, computed } from '@angular/core';
import { ITraveler } from '../models/traveler.interface';
import { IBooking } from '../models/booking.interface';
import { IBookingValues } from '../models/booking-values.interface';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  finalizeBooking() {
    throw new Error('Method not implemented.');
  }
  updatePaymentMethod(methodId: string) {
    throw new Error('Method not implemented.');
  }
  private _mainTraveler = signal<ITraveler>({
    id: 0,
    name: '',
    email: '',
    document: '',
    phone: ''
  });

  private _otherTravelers = signal<ITraveler[]>([]);
  private _specialRequest = signal<string>('');
  private _appliedDiscount = signal<number>(0);

  // Computed signals
  readonly mainTraveler = this._mainTraveler.asReadonly();
  readonly otherTravelers = this._otherTravelers.asReadonly();
  readonly specialRequest = this._specialRequest.asReadonly();
  readonly appliedDiscount = this._appliedDiscount.asReadonly();

  readonly totalTravelers = computed(() => 1 + this._otherTravelers().length);

  readonly isMainTravelerValid = computed(() => {
    const traveler = this._mainTraveler();
    return !!(traveler.name.trim() &&
      traveler.email.trim() &&
      traveler.document.trim() &&
      traveler.phone?.trim());
  });

  readonly areOtherTravelersValid = computed(() => {
    return this._otherTravelers().every(traveler =>
      traveler.name.trim() &&
      traveler.email.trim() &&
      traveler.document.trim()
    );
  });

  readonly isFormValid = computed(() =>
    this.isMainTravelerValid()
  );

  // metodos para atualizar o estado
  updateMainTraveler(traveler: ITraveler): void {
    this._mainTraveler.set(traveler);
  }

  updateOtherTravelers(travelers: ITraveler[]): void {
    this._otherTravelers.set(travelers);
  }

  updateSpecialRequest(request: string): void {
    this._specialRequest.set(request);
  }

  updateAppliedDiscount(discount: number): void {
    this._appliedDiscount.set(discount);
  }

  // metodo para criar o booking final
  createBooking(baseValues: IBookingValues): IBooking {
    const subtotal = baseValues.passagemIda +
      baseValues.passagemVolta +
      baseValues.servicos;

    return {
      mainTraveler: this._mainTraveler(),
      otherTravelers: this._otherTravelers(),
      specialRequest: this._specialRequest(),
      appliedDiscount: this._appliedDiscount(),
      totalAmount: Math.max(0, subtotal - this._appliedDiscount())
    };
  }

  // limpar dados do checkout
  clearCheckoutData(): void {
    this._mainTraveler.set({
      id: 0,
      name: '',
      email: '',
      document: '',
      phone: ''
    });
    this._otherTravelers.set([]);
    this._specialRequest.set('');
    this._appliedDiscount.set(0);
  }
}