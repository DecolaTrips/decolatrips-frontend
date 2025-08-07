import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardMetrics } from '../interfaces/dashboard-metrics';
import { MonthlyStat, ReservationDistribution, TravelPackageDistribution } from '../models/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
private apiUrl = 'http://localhost:8080/api/dashboard';

  constructor(private http: HttpClient) {}

  getMonthlyTravelers(year: number, quarter: number): Observable<MonthlyStat[]> {
    return this.http.get<MonthlyStat[]>(`${this.apiUrl}/monthly-travelers`, {
      params: {
        year: year.toString(),
        quarter: quarter.toString()
      }
    });
  }

  getMonthlyIncome(year: number, quarter: number): Observable<MonthlyStat[]> {
    return this.http.get<MonthlyStat[]>(`${this.apiUrl}/monthly-income`, {
      params: {
        year: year.toString(),
        quarter: quarter.toString()
      }
    });
  }

  getTravelPackageDistribution(): Observable<TravelPackageDistribution> {
    return this.http.get<TravelPackageDistribution>(`${this.apiUrl}/travel-package-distribution`);
  }

  getReservationDistribution(): Observable<ReservationDistribution> {
    return this.http.get<ReservationDistribution>(`${this.apiUrl}/reservation-distribution`);
  }

  getDashboardMetrics(): Observable<DashboardMetrics> {
    return this.http.get<DashboardMetrics>(`${this.apiUrl}/metrics`);
  }
}
