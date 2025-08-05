import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, RegisterUser } from '../models/user.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private route = "http://localhost:8080/api/auth"

  constructor(private http: HttpClient) { }

  login(user: User): Observable<boolean> {
    console.log('Login attempt:', user);
    return of(true);
  }

  register(user: RegisterUser): Observable<boolean> {
    // simulação chamada de API
    console.log('Register attempt:', user);
    return of(true);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.route}/password/forgot`, null, { params: { email: email } })
  }

  resetPassword(token: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.post(`${this.route}/password/reset?token=${token}`, { newPassword, confirmPassword })
  }

}