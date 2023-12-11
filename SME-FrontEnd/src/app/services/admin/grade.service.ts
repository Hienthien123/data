import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from 'src/app/models/baseResponseModel';
import { GradeModel } from 'src/app/models/grade.model';

import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private baseUrl = `${environment.apiUrl}/Grade`;
  constructor(private http: HttpClient) { }


  getAll() : Observable<BaseResponseModel<GradeModel[]>> {
    const apiUrl = `${this.baseUrl}/GetAll`;
    return this.http.get<BaseResponseModel<GradeModel[]>>(apiUrl);
  }
  getById(id: number): Observable<BaseResponseModel<GradeModel>> {
    const apiUrl = `${this.baseUrl}/GetById/${id}`;
    return this.http.get<BaseResponseModel<GradeModel>>(apiUrl);
  }

  create(payload: GradeModel) : Observable<BaseResponseModel<GradeModel>> {
    const apiUrl = `${this.baseUrl}/Create`;
    return this.http.post<BaseResponseModel<GradeModel>>(apiUrl, payload);
  }

  update(payload: GradeModel) : Observable<BaseResponseModel<GradeModel>> {
    const apiUrl = `${this.baseUrl}/Update`;
    return this.http.put<BaseResponseModel<GradeModel>>(apiUrl, payload);
  }

  delete(id: number) : Observable<BaseResponseModel<number>> {
    const apiUrl = `${this.baseUrl}/Delete/${id}`;
    return this.http.delete<BaseResponseModel<number>>(apiUrl);
  }
}
