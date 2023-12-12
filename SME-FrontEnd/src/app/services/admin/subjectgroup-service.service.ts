import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from 'src/app/models/baseResponseModel';
import { SubjectGroupModel } from 'src/app/models/subjectGroup.model';


import { environment } from 'src/environments/environments';
@Injectable({
  providedIn: 'root',
})
export class SubjectgroupServiceService {
  private baseUrl = `${environment.apiUrl}/SubjectGroup`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<BaseResponseModel<SubjectGroupModel[]>> {
    const apiUrl = `${this.baseUrl}/GetAll`;
    return this.http.get<BaseResponseModel<SubjectGroupModel[]>>(apiUrl);
  }
  getby(id: number): Observable<BaseResponseModel<SubjectGroupModel[]>> {
    const apiUrl = `${this.baseUrl}/GetbyOrganizationId/${id}`;
    return this.http.get<BaseResponseModel<SubjectGroupModel[]>>(apiUrl);
  }
  getById(id: number): Observable<BaseResponseModel<SubjectGroupModel>> {
    const apiUrl = `${this.baseUrl}/GetById/${id}`;
    return this.http.get<BaseResponseModel<SubjectGroupModel>>(apiUrl);
  }

  create(
    payload: SubjectGroupModel
  ): Observable<BaseResponseModel<SubjectGroupModel>> {
    const apiUrl = `${this.baseUrl}/Create`;
    return this.http.post<BaseResponseModel<SubjectGroupModel>>(
      apiUrl,
      payload
    );
  }

  update(
    payload: SubjectGroupModel
  ): Observable<BaseResponseModel<SubjectGroupModel>> {
    const apiUrl = `${this.baseUrl}/Update`;
    return this.http.put<BaseResponseModel<SubjectGroupModel>>(apiUrl, payload);
  }

  delete(id: number): Observable<BaseResponseModel<number>> {
    const apiUrl = `${this.baseUrl}/Delete/${id}`;
    return this.http.delete<BaseResponseModel<number>>(apiUrl);
  }
}
