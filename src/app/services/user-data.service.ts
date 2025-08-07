import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ITraveler } from '../models/traveler.interface';
import { environment } from '../../environments/environment';

export interface IUserData extends ITraveler {
  birthDate: string;
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
  private readonly STORAGE_KEY = 'userData';
  private readonly API_BASE_URL = `${environment.apiUrl}${environment.endpoints.users}`;
  
  // mudar para true quando for usar a api
  private readonly USE_API = true;
  
  constructor(private http: HttpClient) {}

  getUserData(): Observable<IUserData> {
    if (this.USE_API) {
      return this.getUserDataFromAPI();
    }
    
    return this.getUserDataFromStorage();
  }

  updateUserData(userData: IUserData): Observable<ApiResponse<IUserData>> {
    if (this.USE_API) {
      return this.updateUserDataViaAPI(userData);
    }
    
    return this.updateUserDataInStorage(userData);
  }

  private getUserDataFromStorage(): Observable<IUserData> {
    try {
      const storedData = localStorage.getItem(this.STORAGE_KEY);
      
      if (storedData) {
        const userData = JSON.parse(storedData);
        return of(userData).pipe(delay(300)); 
      } else {
        const defaultData: IUserData = {
          id: 1,
          name: 'Junior Aquino de Jonas',
          email: 'junioraquinojonas68@email.com',
          document: '000.000.000-00',
          phone: '+55 12 99999-9999',
          birthDate: '1968-10-16'
        };
        return of(defaultData).pipe(delay(300));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      return throwError(() => new Error('Erro ao carregar dados do usuário'));
    }
  }

// simulacao da api
  private updateUserDataInStorage(userData: IUserData): Observable<ApiResponse<IUserData>> {
    try {
      return of(userData).pipe(
        delay(800), 
        map(data => {
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
          
          return {
            success: true,
            data: data,
            message: 'Dados atualizados com sucesso!'
          };
        }),
        catchError(error => {
          console.error('Error saving user data:', error);
          return of({
            success: false,
            message: 'Erro ao salvar dados do usuário',
            errors: [error.message]
          });
        })
      );
    } catch (error) {
      return throwError(() => new Error('Erro ao salvar dados do usuário'));
    }
  }

  // pra quando tiver usando a api
  private getUserDataFromAPI(): Observable<IUserData> {
    const userId = this.getCurrentUserId(); 
    
    return this.http.get<ApiResponse<IUserData>>(`${this.API_BASE_URL}/${userId}`).pipe(
      map(response => {
        if (response.success && response.data) {
          return response.data;
        } else {
          throw new Error(response.message || 'Erro ao carregar dados do usuário');
        }
      }),
      catchError(error => {
        console.error('API Error:', error);
        return throwError(() => new Error('Erro ao carregar dados do usuário'));
      })
    );
  }

  private updateUserDataViaAPI(userData: IUserData): Observable<ApiResponse<IUserData>> {
    return this.http.put<ApiResponse<IUserData>>(`${this.API_BASE_URL}/${userData.id}`, userData).pipe(
      catchError(error => {
        console.error('API Error:', error);
        return throwError(() => new Error('Erro ao salvar dados do usuário'));
      })
    );
  }

  private getCurrentUserId(): number {
    return 1;
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

    if (!userData.document?.trim()) {
      errors.push('CPF é obrigatório');
    } else if (!this.isValidCPF(userData.document)) {
      errors.push('CPF inválido');
    }

    if (!userData.phone?.trim()) {
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
    if (this.USE_API) {
      return this.http.post<ApiResponse<null>>(`${environment.apiUrl}/auth/logout`, {}).pipe(
        map(() => {
          localStorage.removeItem(this.STORAGE_KEY);
          return { success: true, message: 'Logout realizado com sucesso' };
        }),
        catchError(() => {
          localStorage.removeItem(this.STORAGE_KEY); // Clear local data anyway
          return of({ success: true, message: 'Dados limpos localmente' });
        })
      );
    }
    
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return of({
        success: true,
        message: 'Dados limpos com sucesso'
      }).pipe(delay(300));
    } catch (error) {
      return throwError(() => new Error('Erro ao limpar dados do usuário'));
    }
  }
}
