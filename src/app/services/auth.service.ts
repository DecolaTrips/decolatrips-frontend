import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, RegisterUser } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../interfaces/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  baseUrl: string = "http://localhost:8080/api/auth"

  login(user: User): Observable<AuthResponse> {
      const rota: string = "login";
      return this.http.post<AuthResponse>(`${this.baseUrl}/${rota}`, user);
    }

  register(user: RegisterUser): Observable<any> {
    const rota: string = "register";
    return this.http.post<any>(`${this.baseUrl}/${rota}`, user);
  }

  forgotPassword(email: string): Observable<boolean> {
    // simulação chamada de API
    console.log('Forgot password for:', email);
    return of(true);
  }
}