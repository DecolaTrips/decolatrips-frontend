import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../interfaces/user-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  baseUrl: string = "http://localhost:8080/api/users";

  public getUsersApi(pageNo: number = 0, pageSize: number = 10): Observable<UserResponse> {
    const params = `?pageNo=${pageNo}&pageSize=${pageSize}`;
    return this.http.get<UserResponse>(this.baseUrl + params);
  }





}
