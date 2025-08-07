import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BookedPackage } from '../models/package.interface';
import { environment } from '../../environments/environment';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}


export interface SupportContactResponse {
  success: boolean;
  ticketId?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserPackagesService {
  private readonly STORAGE_KEY = 'userPackages';
  private readonly API_BASE_URL = `${environment.apiUrl}/api/user-packages`;
  
  // mudar pra true quando for usar a api
  private readonly USE_API = false;
  
  constructor(private http: HttpClient) {}


  getUserPackages(): Observable<BookedPackage[]> {
    if (this.USE_API) {
      return this.getUserPackagesFromAPI();
    }
    
    return this.getUserPackagesFromStorage();
  }


  getPackageById(packageId: number): Observable<BookedPackage | null> {
    return this.getUserPackages().pipe(
      map(packages => packages.find(pkg => pkg.id === packageId) || null)
    );
  }

 

  contactSupport(packageId: number, message?: string): Observable<SupportContactResponse> {
    if (this.USE_API) {
      return this.contactSupportViaAPI(packageId, message);
    }
    
    return this.simulateSupportContact(packageId, message);
  }

 
  updatePackageStatus(packageId: number, status: 'confirmed' | 'pending' | 'cancelled'): Observable<ApiResponse<BookedPackage>> {
    if (this.USE_API) {
      return this.updatePackageStatusViaAPI(packageId, status);
    }
    
    return this.updatePackageStatusInStorage(packageId, status);
  }

  private getUserPackagesFromStorage(): Observable<BookedPackage[]> {
    try {
      const storedPackages = localStorage.getItem(this.STORAGE_KEY);
      
      if (!storedPackages) {
        const mockPackages = this.getMockPackages();
        this.savePackagesToStorage(mockPackages);
        return of(mockPackages).pipe(delay(500));
      }
      
      const packages: BookedPackage[] = JSON.parse(storedPackages);
      const parsedPackages = packages.map(pkg => ({
        ...pkg,
        bookingDate: new Date(pkg.bookingDate),
        travelDate: new Date(pkg.travelDate)
      }));
      
      return of(parsedPackages).pipe(delay(500));
    } catch (error) {
      console.error('Error retrieving packages from storage:', error);
      return throwError(() => new Error('Failed to retrieve user packages'));
    }
  }

  private savePackagesToStorage(packages: BookedPackage[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(packages));
    } catch (error) {
      console.error('Error saving packages to storage:', error);
    }
  }

  private updatePackageStatusInStorage(packageId: number, status: 'confirmed' | 'pending' | 'cancelled'): Observable<ApiResponse<BookedPackage>> {
    try {
      const storedPackages = localStorage.getItem(this.STORAGE_KEY);
      if (!storedPackages) {
        return throwError(() => new Error('No packages found'));
      }

      const packages: BookedPackage[] = JSON.parse(storedPackages);
      const packageIndex = packages.findIndex(pkg => pkg.id === packageId);
      
      if (packageIndex === -1) {
        return throwError(() => new Error('Package not found'));
      }

      packages[packageIndex].status = status;
      this.savePackagesToStorage(packages);

      return of({
        success: true,
        data: {
          ...packages[packageIndex],
          bookingDate: new Date(packages[packageIndex].bookingDate),
          travelDate: new Date(packages[packageIndex].travelDate)
        },
        message: 'Package status updated successfully'
      }).pipe(delay(500));
    } catch (error) {
      console.error('Error updating package status:', error);
      return throwError(() => new Error('Failed to update package status'));
    }
  }


  private simulateSupportContact(packageId: number, message?: string): Observable<SupportContactResponse> {
    return this.getPackageById(packageId).pipe(
      map(pkg => {
        if (!pkg) {
          throw new Error('Package not found');
        }
        return {
          success: true,
          ticketId: `TICKET-${packageId}-${Date.now()}`,
          message: 'Support ticket created successfully. You will receive a response within 24 hours.'
        };
      }),
      delay(1000),
      catchError(error => of({
        success: false,
        message: error.message || 'Failed to contact support'
      }))
    );
  }

  private getUserPackagesFromAPI(): Observable<BookedPackage[]> {
    return this.http.get<ApiResponse<BookedPackage[]>>(`${this.API_BASE_URL}`).pipe(
      map(response => {
        if (response.success && response.data) {
          return response.data.map(pkg => ({
            ...pkg,
            bookingDate: new Date(pkg.bookingDate),
            travelDate: new Date(pkg.travelDate)
          }));
        }
        throw new Error(response.message || 'Failed to fetch packages');
      }),
      catchError(error => {
        console.error('API Error:', error);
        return throwError(() => new Error('Failed to retrieve user packages from server'));
      })
    );
  }

  private contactSupportViaAPI(packageId: number, message?: string): Observable<SupportContactResponse> {
    return this.http.post<SupportContactResponse>(`${this.API_BASE_URL}/${packageId}/support`, {
      message: message || 'Support request for package'
    }).pipe(
      catchError(error => {
        console.error('API Error:', error);
        return of({
          success: false,
          message: 'Failed to contact support via server'
        });
      })
    );
  }

  private updatePackageStatusViaAPI(packageId: number, status: string): Observable<ApiResponse<BookedPackage>> {
    return this.http.patch<ApiResponse<BookedPackage>>(`${this.API_BASE_URL}/${packageId}/status`, {
      status
    }).pipe(
      map(response => {
        if (response.success && response.data) {
          return {
            ...response,
            data: {
              ...response.data,
              bookingDate: new Date(response.data.bookingDate),
              travelDate: new Date(response.data.travelDate)
            }
          };
        }
        return response;
      }),
      catchError(error => {
        console.error('API Error:', error);
        return throwError(() => new Error('Failed to update package status via server'));
      })
    );
  }

  // pra teste, acho que vai ter que tirar quando for usar a api
  private getMockPackages(): BookedPackage[] {
    return [
      {
        id: 1,
        destination: 'Egito',
        travelers: 4,
        price: 120000,
        image: '/images/background.jpg',
        status: 'confirmed',
        bookingDate: new Date('2024-12-15'),
        travelDate: new Date('2025-02-20'),
        paymentMethod: 'Cartão de crédito'
      },
      {
        id: 2,
        destination: 'Egito',
        travelers: 4,
        price: 120000,
        image: '/images/background.jpg',
        status: 'confirmed',
        bookingDate: new Date('2024-11-10'),
        travelDate: new Date('2025-03-15'),
        paymentMethod: 'Cartão de crédito'
      },
      {
        id: 3,
        destination: 'Egito',
        travelers: 4,
        price: 120000,
        image: '/images/background.jpg',
        status: 'pending',
        bookingDate: new Date('2024-12-20'),
        travelDate: new Date('2025-04-10'),
        paymentMethod: 'Pix'
      }
    ];
  }
}
