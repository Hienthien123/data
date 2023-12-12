import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizationModel } from 'src/app/models/organization.model';
import { BaseResponseModel } from 'src/app/models/baseResponseModel';

import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class OrganizationServiceService {

  private baseUrl = `${environment.apiUrl}/organization`;

  constructor(private http: HttpClient) { }

  getAll() : Observable<BaseResponseModel<OrganizationModel[]>> {
    const apiUrl = `${this.baseUrl}/GetAll`;
    return this.http.get<BaseResponseModel<OrganizationModel[]>>(apiUrl);
  }

  getById(id: number): Observable<BaseResponseModel<OrganizationModel>> {
    const apiUrl = `${this.baseUrl}/GetById/${id}`;
    return this.http.get<BaseResponseModel<OrganizationModel>>(apiUrl);
  }

  create(payload: OrganizationModel) : Observable<BaseResponseModel<OrganizationModel>> {
    const apiUrl = `${this.baseUrl}/Create`;
    return this.http.post<BaseResponseModel<OrganizationModel>>(apiUrl, payload);
  }

  update(payload: OrganizationModel) : Observable<BaseResponseModel<OrganizationModel>> {
    const apiUrl = `${this.baseUrl}/Update`;
    return this.http.put<BaseResponseModel<OrganizationModel>>(apiUrl, payload);
  }

  delete(id: number) : Observable<BaseResponseModel<number>> {
    const apiUrl = `${this.baseUrl}/Delete/${id}`;
    return this.http.delete<BaseResponseModel<number>>(apiUrl);
  }
  
}
