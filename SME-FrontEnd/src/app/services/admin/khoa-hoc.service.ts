import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BaseResponseModel} from "../../models/baseResponseModel";
import {environment} from "../../../environments/environments";
import { CourseModel } from 'src/app/models/doan/courseModel';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class KhoaHocService {
  private baseUrl = `${environment.apiUrl}/course`;
  constructor(private http:HttpClient) { }

  getAll(payload: any):Observable<BaseResponseModel<CourseModel[]>> {
    const apiUrl = `${this.baseUrl}/getallcourseadmin`;
    return this.http.post<BaseResponseModel<CourseModel[]>>(apiUrl,payload);
  }

  getById(payload: any):Observable<BaseResponseModel<CourseModel>> {
    const apiUrl = `${this.baseUrl}/getcoursebyidadmin`;
    return this.http.post<BaseResponseModel<CourseModel>>(apiUrl,payload);
  }

  create(payload: any):Observable<BaseResponseModel<CourseModel>> {
    const apiUrl = `${this.baseUrl}/createcourse`;
    return this.http.post<BaseResponseModel<CourseModel>>(apiUrl,payload);
  }

  update(payload: any):Observable<BaseResponseModel<CourseModel>> {
    const apiUrl = `${this.baseUrl}/updatecourse`;
    return this.http.post<BaseResponseModel<CourseModel>>(apiUrl,payload);
  }

  delete(payload: any):Observable<BaseResponseModel<CourseModel>> {
    const apiUrl = `${this.baseUrl}/deletecourse`;
    return this.http.post<BaseResponseModel<CourseModel>>(apiUrl,payload);
  }

}
