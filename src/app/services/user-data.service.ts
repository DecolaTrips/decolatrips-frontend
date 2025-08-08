import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ITraveler } from '../models/traveler.interface';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

export interface IUserData {
  birthDate: string;
  idUser: number;
  name: string;
  email: string;
  cpf: string;
  username: string;
  passport?: string;
  telephone?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private readonly API_BASE_URL = `${environment.apiUrl}${environment.endpoints.users}`;

  private readonly USE_API = true;

  constructor(private http: HttpClient) { }

  getUserData(): Observable<IUserData> {
    if (!this.isUserAuthenticated()) {
      return throwError(() => new Error('Usuário não está logado'));
    }
    return this.getUserDataFromAPI();
  }

  updateUserData(userData: IUserData): Observable<ApiResponse<IUserData>> {
    return this.updateUserDataViaAPI(userData);
  }


  private getUserDataFromAPI(): Observable<IUserData> {
    const userId = localStorage.getItem('userId');

    let url = `${this.API_BASE_URL}/${userId}`

    return this.http.get<IUserData>(url).pipe(
      map(response => {
        if (response.idUser) {
          return response;
        } else {
          throw new Error('Erro ao carregar dados do usuário');
        }
      }),
      catchError(error => {
        console.error('API Error ao buscar dados do usuário:', error);
        if (error.status === 401) {
          throw new Error('Usuário não autenticado');
        } else if (error.status === 404) {
          throw new Error('Usuário não encontrado');
        } else if (error.status === 500) {
          throw new Error('Erro interno do servidor');
        }
        return throwError(() => new Error('Erro ao carregar dados do usuário'));
      })
    );
  }

  private updateUserDataViaAPI(userData: IUserData): Observable<ApiResponse<IUserData>> {
    return this.http.put<ApiResponse<IUserData>>(`${this.API_BASE_URL}/${userData.idUser}`, userData).pipe(
      catchError(error => {
        console.error('API Error ao atualizar dados do usuário:', error);
        if (error.status === 401) {
          return throwError(() => new Error('Usuário não autenticado'));
        } else if (error.status === 403) {
          return throwError(() => new Error('Permissão negada para atualizar dados'));
        } else if (error.status === 404) {
          return throwError(() => new Error('Usuário não encontrado'));
        } else if (error.status === 422) {
          return throwError(() => new Error('Dados inválidos fornecidos'));
        } else if (error.status === 500) {
          return throwError(() => new Error('Erro interno do servidor'));
        }
        return throwError(() => new Error('Erro ao salvar dados do usuário'));
      })
    );
  }

  private isUserAuthenticated(): boolean {
    const jwt = localStorage.getItem('jwt');
    const currentUser = localStorage.getItem('currentUser');

    return !!(jwt || currentUser);
  }

  validateUserData(userData: IUserData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!userData.name?.trim()) {
      errors.push('Nome é obrigatório');
    }

    if (!userData.email?.trim()) {
      errors.push('Email é obrigatório');
    } else if (!this.isValidEmail(userData.email)) {
      errors.push('Email inválido');
    }

    if (!userData.cpf?.trim()) {
      errors.push('CPF é obrigatório');
    } else if (!this.isValidCPF(userData.cpf)) {
      errors.push('CPF inválido');
    }

    if (!userData.telephone?.trim()) {
      errors.push('Telefone é obrigatório');
    }

    if (!userData.birthDate) {
      errors.push('Data de nascimento é obrigatória');
    } else {
      const birthDate = new Date(userData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      if (age < 18 || age > 120) {
        errors.push('Data de nascimento inválida');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  formatDocument(value: string): string {
    if (!value) return '';

    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  }

  formatPhone(value: string): string {
    if (!value) return '';

    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 13) {
      return numbers.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 $2 $3-$4');
    }
    return value;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidCPF(cpf: string): boolean {
    const numbers = cpf.replace(/\D/g, '');

    if (numbers.length !== 11) return false;

    // pra ver se todos os digitos sao os mesmos
    if (/^(\d)\1{10}$/.test(numbers)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(numbers.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(numbers.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(numbers.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(numbers.charAt(10))) return false;

    return true;
  }

  // pra uso com a api
  clearUserData(): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${environment.apiUrl}${environment.endpoints.auth}/logout`, {}).pipe(
      map(() => ({ success: true, message: 'Logout realizado com sucesso' })),
      catchError(() => of({ success: false, message: 'Erro ao limpar dados do usuário' }))
    );
  }
}
