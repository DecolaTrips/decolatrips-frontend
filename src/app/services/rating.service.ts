import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiUrl = 'http://localhost:8080/api/ratings/';

  constructor(private http: HttpClient) {}

  getRatings(packageId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}${packageId}`);
  }
}
