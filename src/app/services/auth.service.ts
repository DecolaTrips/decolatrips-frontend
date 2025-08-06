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

  login(user: User): Observable<any> {
    return this.http.post(`${this.route}/login`, user);
  }

  register(user: RegisterUser): Observable<any> {
    const registerData = {
      username: user.username,
      email: user.email,
      cpf: user.cpf,
      password: user.password,
      confirmPassword: user.confirmPassword
    };
    return this.http.post(`${this.route}/register`, registerData, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.route}/password/forgot`, null, { params: { email: email } })
  }

  resetPassword(token: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.post(`${this.route}/password/reset?token=${token}`, { newPassword, confirmPassword })
  }

}