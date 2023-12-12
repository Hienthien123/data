import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from 'src/app/models/baseResponseModel';
import { ClassModel } from 'src/app/models/class.model';


import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ClassServiceService {

  private baseUrl = `${environment.apiUrl}/CLass`;
  constructor(private http: HttpClient) { }


  getAll() : Observable<BaseResponseModel<ClassModel[]>> {
    const apiUrl = `${this.baseUrl}/GetAll`;
    return this.http.get<BaseResponseModel<ClassModel[]>>(apiUrl);
  }
  getById(id: number): Observable<BaseResponseModel<ClassModel>> {
    const apiUrl = `${this.baseUrl}/GetById/${id}`;
    return this.http.get<BaseResponseModel<ClassModel>>(apiUrl);
  }

  create(payload: ClassModel) : Observable<BaseResponseModel<ClassModel>> {
    const apiUrl = `${this.baseUrl}/Create`;
    return this.http.post<BaseResponseModel<ClassModel>>(apiUrl, payload);
  }

  update(payload: ClassModel) : Observable<BaseResponseModel<ClassModel>> {
    const apiUrl = `${this.baseUrl}/Update`;
    return this.http.put<BaseResponseModel<ClassModel>>(apiUrl, payload);
  }

  delete(id: number) : Observable<BaseResponseModel<number>> {
    const apiUrl = `${this.baseUrl}/Delete/${id}`;
    return this.http.delete<BaseResponseModel<number>>(apiUrl);
  }
}
