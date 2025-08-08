import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, RegisterUser } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Reservation } from '../models/reservation.model';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private route = "http://localhost:8080/api"

  constructor(private http: HttpClient) { }

  createReservation(reservation: Reservation): Observable<any> {
    return this.http.post(`${this.route}/reservations`, reservation);
  }
} 