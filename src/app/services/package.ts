import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Package {
  private apiUrl = 'http://localhost:8080/api/travel-packages'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getPackageById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}

