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
  baseUrl: string = "http://localhost:8080/api/auth/login"

  login(user: User): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(this.baseUrl, user);
    }

  register(user: RegisterUser): Observable<boolean> {
    // simulação chamada de API
    console.log('Register attempt:', user);
    return of(true);
  }

  forgotPassword(email: string): Observable<boolean> {
    // simulação chamada de API
    console.log('Forgot password for:', email);
    return of(true);
  }
}