import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private readonly baseUrl = 'http://localhost:8080/api/packages'; // ajuste conforme sua base

  constructor(private http: HttpClient) {}

  uploadImage(packageId: number, file: File, description: string): Observable<any> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('description', description);

  return this.http.post(`http://localhost:8080/api/packages/${packageId}/images`, formData);
}
  }
  

