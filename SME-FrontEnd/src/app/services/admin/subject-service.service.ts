import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {BaseResponseModel} from "../../models/baseResponseModel";
import {SubjectModel} from "../../models/Subject.model";
import {environment} from "../../../environments/environments";



@Injectable({
  providedIn: 'root'
})
export class SubjectServiceService {
  private baseUrl = `${environment.apiUrl}/Subject`;
  constructor(private http: HttpClient) { }

  getAll() : Observable<BaseResponseModel<SubjectModel[]>> {
    const apiUrl = `${this.baseUrl}/GetAll`;
    return this.http.get<BaseResponseModel<SubjectModel[]>>(apiUrl);
  }

  getById(id: number): Observable<BaseResponseModel<SubjectModel>> {
    const apiUrl = `${this.baseUrl}/GetById/${id}`;
    return this.http.get<BaseResponseModel<SubjectModel>>(apiUrl);
  }

  create(payload: SubjectModel) : Observable<BaseResponseModel<SubjectModel>> {
    const apiUrl = `${this.baseUrl}/Create`;
    return this.http.post<BaseResponseModel<SubjectModel>>(apiUrl, payload);
  }

  update(payload: SubjectModel) : Observable<BaseResponseModel<SubjectModel>> {
    const apiUrl = `${this.baseUrl}/Update`;
    return this.http.put<BaseResponseModel<SubjectModel>>(apiUrl, payload);
  }

  delete(id: number) : Observable<BaseResponseModel<number>> {
    const apiUrl = `${this.baseUrl}/Delete/${id}`;
    return this.http.delete<BaseResponseModel<number>>(apiUrl);
  }
}
