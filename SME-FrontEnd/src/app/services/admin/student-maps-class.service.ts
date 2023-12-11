import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environments";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseResponseModel} from "../../models/baseResponseModel";
import {SubjectModel} from "../../models/Subject.model";
import {StudentMapsClassModel} from "../../models/studentMapsClass.model";

@Injectable({
  providedIn: 'root'
})
export class StudentMapsClassService {

  private baseUrl:string = `${environment.apiUrl}/StudentMapsClass`
  constructor(private http:HttpClient) { }

  getAll() : Observable<BaseResponseModel<StudentMapsClassModel[]>> {
    const apiUrl = `${this.baseUrl}/GetAll`;
    return this.http.get<BaseResponseModel<StudentMapsClassModel[]>>(apiUrl);
  }

  getByIdFKClass(id: number): Observable<BaseResponseModel<StudentMapsClassModel[]>> {
    const apiUrl = `${this.baseUrl}/GetByIdFKClass/${id}`;
    return this.http.get<BaseResponseModel<StudentMapsClassModel[]>>(apiUrl);
  }

  GetByIdFKStudent(id: number): Observable<BaseResponseModel<StudentMapsClassModel[]>> {
    const apiUrl = `${this.baseUrl}/GetByIdFKStudent/${id}`;
    return this.http.get<BaseResponseModel<StudentMapsClassModel[]>>(apiUrl);
  }

  create(payload: StudentMapsClassModel) : Observable<BaseResponseModel<StudentMapsClassModel>> {
    const apiUrl = `${this.baseUrl}/Create`;
    return this.http.post<BaseResponseModel<StudentMapsClassModel>>(apiUrl, payload);
  }
  createMultiple(payload: StudentMapsClassModel[]) : Observable<BaseResponseModel<StudentMapsClassModel[]>> {
    const apiUrl = `${this.baseUrl}/CreateMultiple`;
    return this.http.post<BaseResponseModel<StudentMapsClassModel[]>>(apiUrl, payload);
  }

  update(payload: StudentMapsClassModel) : Observable<BaseResponseModel<StudentMapsClassModel>> {
    const apiUrl = `${this.baseUrl}/Update`;
    return this.http.put<BaseResponseModel<StudentMapsClassModel>>(apiUrl, payload);
  }

  delete(id: number) : Observable<BaseResponseModel<number>> {
    const apiUrl = `${this.baseUrl}/Delete/${id}`;
    return this.http.delete<BaseResponseModel<number>>(apiUrl);
  }
}
