import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, RegisterUser } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CreateReservationDTO } from '../models/reservation.model';
import { BookedPackage } from '../models/package.interface';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private route = "http://localhost:8080/api"

  constructor(private http: HttpClient) { }

  createReservation(reservation: CreateReservationDTO): Observable<any> {
    return this.http.post(`${this.route}/reservations`, reservation);
  }

  getReservationByUserId(userId: number): Observable<BookedPackage[]> {
    return this.http.get<BookedPackage[]>(`${this.route}/users/${userId}/reservations`);
  }
} 