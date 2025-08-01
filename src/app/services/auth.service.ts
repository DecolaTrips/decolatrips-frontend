import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, RegisterUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(user: User): Observable<boolean> {
    // simulação chamada de API
    console.log('Login attempt:', user);
    return of(true);
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