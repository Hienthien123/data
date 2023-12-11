import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from 'src/app/models/baseResponseModel';
import { tuitionTransaction } from 'src/app/models/tuitionTransaction';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TuitionTransactionServiceService {
  private baseUrl = `${environment.apiUrl}/TuitionTransaction`;

  constructor(private http: HttpClient) { }

  create(payload: tuitionTransaction) : Observable<BaseResponseModel<tuitionTransaction>> {
    const apiUrl = `${this.baseUrl}/Create`;
    return this.http.post<BaseResponseModel<tuitionTransaction>>(apiUrl, payload);
  }

  update(payload: tuitionTransaction) : Observable<BaseResponseModel<tuitionTransaction>> {
    const apiUrl = `${this.baseUrl}/Update`;
    return this.http.put<BaseResponseModel<tuitionTransaction>>(apiUrl, payload);
  }
}
