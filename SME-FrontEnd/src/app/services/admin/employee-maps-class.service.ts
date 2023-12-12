import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environments";
import {BaseResponseModel} from "../../models/baseResponseModel";
import {Observable} from "rxjs";
import { EmployeeModel } from 'src/app/models/Employee.model';
import { employeeMapsClassModel } from 'src/app/models/employeeMapsClass.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeMapService {
  private baseUrl:string = `${environment.apiUrl}/Employeemapsclass`

  constructor(private http:HttpClient) { }

  getAll() : Observable<BaseResponseModel<employeeMapsClassModel[]>> {
    const apiUrl = `${this.baseUrl}/GetAll`;
    return this.http.get<BaseResponseModel<employeeMapsClassModel[]>>(apiUrl);
  }

  GetInfoByIdFkClassId(id: number): Observable<BaseResponseModel<employeeMapsClassModel[]>> {
    const apiUrl = `${this.baseUrl}/GetInfoByIdFkClassId/${id}`;
    return this.http.get<BaseResponseModel<employeeMapsClassModel[]>>(apiUrl);
  }

  GetInfoByIdFkEmployeeId(id: number): Observable<BaseResponseModel<employeeMapsClassModel[]>> {
    const apiUrl = `${this.baseUrl}/GetInfoByIdFkEmployeeId/${id}`;
    return this.http.get<BaseResponseModel<employeeMapsClassModel[]>>(apiUrl);
  }

  create(payload: employeeMapsClassModel) : Observable<BaseResponseModel<employeeMapsClassModel>> {
    const apiUrl = `${this.baseUrl}/Create`;
    return this.http.post<BaseResponseModel<employeeMapsClassModel>>(apiUrl, payload);
  }
  createMultiple(payload: employeeMapsClassModel[]) : Observable<BaseResponseModel<employeeMapsClassModel[]>> {
    const apiUrl = `${this.baseUrl}/CreateMultiple`;
    return this.http.post<BaseResponseModel<employeeMapsClassModel[]>>(apiUrl, payload);
  }

  update(payload: employeeMapsClassModel) : Observable<BaseResponseModel<employeeMapsClassModel>> {
    const apiUrl = `${this.baseUrl}/Update`;
    return this.http.put<BaseResponseModel<employeeMapsClassModel>>(apiUrl, payload);
  }

  delete(id: number) : Observable<BaseResponseModel<number>> {
    const apiUrl = `${this.baseUrl}/Delete/${id}`;
    return this.http.delete<BaseResponseModel<number>>(apiUrl);
  }
  
}
