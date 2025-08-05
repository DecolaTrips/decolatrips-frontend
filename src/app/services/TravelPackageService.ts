import { Injectable } from '@angular/core';
import { TravelPackageCreate } from '../models/travel-package-create';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelPackageService {

  private apiUrl = 'http://localhost:8080/api/travel-packages'; // ajuste para o seu endpoint

  constructor(private http: HttpClient) {}

  createTravelPackage(dto: TravelPackageCreate, imageFiles: File[]): Observable<any> {
    const formData = new FormData();

    // Adiciona o DTO como string JSON
    formData.append('travelPackage', new Blob([JSON.stringify(dto)], { type: 'application/json' }));

    // Adiciona imagens (se existirem)
    if (imageFiles && imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        formData.append('images', file); // nome do campo: "images"
      });
    }

    return this.http.post<any>(`${this.apiUrl}`, formData);
  }

getAllTravelPackages(page: number = 0, size: number = 10): Observable<any> {
  const params = `?page=${page}&size=${size}`;
  return this.http.get<any>(`${this.apiUrl}/detailed${params}`);
}
getPackageById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
updateTravelPackage(packageId: number, dto: any, images: File[]): Observable<any> {
  const formData = new FormData();

  // Serializar o DTO completo como JSON dentro da parte 'travelPackage'
  formData.append('travelPackage', new Blob([JSON.stringify(dto)], { type: 'application/json' }));

  // Anexar imagens (se houver)
  if (images && images.length > 0) {
    images.forEach(image => {
      formData.append('images', image);
    });
  }

  return this.http.put(`${this.apiUrl}/${packageId}`, formData);
}

deletePackage(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

}
