import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = `${environment.apiUrl}/review`;
  constructor(private http:HttpClient) { }

  getAll(payload: any):Observable<any> {
    const apiUrl = `${this.baseUrl}/read`;
    return this.http.post<any>(apiUrl,payload);
  }
  create(payload: any):Observable<any> {
    const apiUrl = `${this.baseUrl}/create`;
    return this.http.post<any>(apiUrl,payload);
  }
}
