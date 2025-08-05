import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AvailabilityCreate } from '../models/availability-create';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {

 private apiUrl = 'http://localhost:8080/api/travel-packages' ;

  constructor(private http: HttpClient) {}

  // Criar novas disponibilidades
  createAvailabilities(packageId: number, availabilities: AvailabilityCreate[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/${packageId}/availabilities`, availabilities);
  }

  // Buscar todas por pacote
  getAllByPackage(packageId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${packageId}/availabilities`);
  }

  // Atualizar uma
  updateAvailability(packageId: number, availabilityId: number, dto: AvailabilityCreate): Observable<any> {
    return this.http.put(`${this.apiUrl}/${packageId}/availabilities/${availabilityId}`, dto);
  }

  // Deletar
  deleteAvailability(packageId: number, availabilityId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${packageId}/availabilities/${availabilityId}`);
  }

}
