import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = `${environment.apiUrl}/payment`;
  constructor(private http:HttpClient) { }
  create(payload:any):Observable<any>{
    const apiUrl = `${this.baseUrl}/create`;
    return this.http.post<any>(apiUrl,payload)
  }
  confirm(payload:any):Observable<any>{
    const apiUrl = `${this.baseUrl}/confirm`;
    return this.http.post<any>(apiUrl,payload)
  }
  getUserPayment(payload: any):Observable<any>{
    const apiUrl = `${this.baseUrl}/getuserpayment`;
    return this.http.post<any>(apiUrl,payload)
  }
}
