import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.apiUrl}/user`;
  constructor(private http:HttpClient) { }
  checkjwt(payload: any):Observable<any> {
    const apiUrl = `${environment.apiUrl}/auth/checkjwtuser`;
    return this.http.post<any>(apiUrl,payload);
  }
}
