import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from 'src/app/models/baseResponseModel';
import { ReviewModel } from 'src/app/models/doan/reviewModel';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = `${environment.apiUrl}/review`;
  constructor(private http:HttpClient) { }

   
  getAll(payload: any):Observable<BaseResponseModel<ReviewModel[]>> {
    const apiUrl = `${this.baseUrl}/read`;
    return this.http.post<BaseResponseModel<ReviewModel[]>>(apiUrl,payload);
  }
  getById(payload: any):Observable<BaseResponseModel<ReviewModel>> {
    const apiUrl = `${this.baseUrl}/getbyid`;
    return this.http.post<BaseResponseModel<ReviewModel>>(apiUrl,payload);
  }

  create(payload: any):Observable<BaseResponseModel<ReviewModel>> {
    const apiUrl = `${this.baseUrl}/create`;
    return this.http.post<BaseResponseModel<ReviewModel>>(apiUrl,payload);
  }

  update(payload: any):Observable<BaseResponseModel<ReviewModel>> {
    const apiUrl = `${this.baseUrl}/update`;
    return this.http.post<BaseResponseModel<ReviewModel>>(apiUrl,payload);
  }

  delete(payload: any):Observable<BaseResponseModel<ReviewModel>> {
    const apiUrl = `${this.baseUrl}/delete`;
    return this.http.post<BaseResponseModel<ReviewModel>>(apiUrl,payload);
  }
}
