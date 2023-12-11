import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from 'src/app/models/baseResponseModel';
import { EducationalYearModel } from 'src/app/models/educationalYear.model';

import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class EducationalYearService {

  private baseUrl = `${environment.apiUrl}/EducationalYear`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<BaseResponseModel<EducationalYearModel[]>> {
    const apiUrl = `${this.baseUrl}/GetAllYear`;
    return this.http.get<BaseResponseModel<EducationalYearModel[]>>(apiUrl);
  }


  // GET
  // /api/ChucDanh/GetById/{id}
  getById(id: number): Observable<BaseResponseModel<EducationalYearModel>> {
    const apiUrl = `${this.baseUrl}/GetById/${id}`;
    return this.http.get<BaseResponseModel<EducationalYearModel>>(apiUrl);
  }

  // POST 
  // /api/ChucDanh/Create
  create(payload: EducationalYearModel): Observable<BaseResponseModel<EducationalYearModel>> {
    const apiUrl = `${this.baseUrl}/CreateYear`;
    return this.http.post<BaseResponseModel<EducationalYearModel>>(apiUrl, payload);
  }
  // PUT
  // /api/ChucDanh/Update
  update(payload: EducationalYearModel) : Observable<BaseResponseModel<EducationalYearModel>> {
    const apiUrl = `${this.baseUrl}/Update`;
    return this.http.put<BaseResponseModel<EducationalYearModel>>(apiUrl, payload);
  }

  // DELETE
  // /api/ChucDanh/Delete/{id}
  delete(id: number) : Observable<BaseResponseModel<number>> {
    const apiUrl = `${this.baseUrl}/Delete/${id}`;
    return this.http.delete<BaseResponseModel<number>>(apiUrl);
  }
}
