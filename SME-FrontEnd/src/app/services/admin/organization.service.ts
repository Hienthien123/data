import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environments";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseResponseModel} from "../../models/baseResponseModel";
import {OrganizationModel} from "../../models/organization.model";

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private baseUrl : string = `${environment.apiUrl}/Organization`;
  constructor(private  http:HttpClient) { }
  getAll():Observable<BaseResponseModel<OrganizationModel[]>>{
    const apiUrl = `${this.baseUrl}/GetAll`;
    return this.http.get<BaseResponseModel<OrganizationModel[]>>(apiUrl);
  }

  getById(id:number):Observable<BaseResponseModel<OrganizationModel>>{
    const apiUrl:string =`${this.baseUrl}/GetById/${id}`
    return this.http.get<BaseResponseModel<OrganizationModel>>(apiUrl);
  }

  create(payload:OrganizationModel):Observable<BaseResponseModel<OrganizationModel>>{
    const apiUrl:string =`${this.baseUrl}/Create`;
    return this.http.post<BaseResponseModel<OrganizationModel>>(apiUrl,payload);
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
