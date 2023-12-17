import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // Hàm này gửi một request đến server để lấy token
  getTokenFromServer(): Observable<any> {
    // Thực hiện request lấy token từ server
    return this.http.get<any>('URL để lấy token từ server');
  }
}
