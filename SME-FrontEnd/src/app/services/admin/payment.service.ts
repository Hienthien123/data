import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from 'src/app/models/baseResponseModel';
import { PaymentModel } from 'src/app/models/doan/paymentModel';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = `${environment.apiUrl}/payment`;
  constructor(private http:HttpClient) { }

  getAll(payload: any):Observable<BaseResponseModel<PaymentModel[]>> {
    const apiUrl = `${this.baseUrl}/read`;
    return this.http.post<BaseResponseModel<PaymentModel[]>>(apiUrl,payload);
  }

  delete(payload: any):Observable<BaseResponseModel<PaymentModel>> {
    const apiUrl = `${this.baseUrl}/delete`;
    return this.http.post<BaseResponseModel<PaymentModel>>(apiUrl,payload);
  }
}
