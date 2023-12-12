import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from 'src/app/models/baseResponseModel';
import { StudentMapsTuition } from 'src/app/models/studentMapsTuition';
import { studentMoneyMonth } from 'src/app/models/studentMoneyMonth';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class StudentMapTuitionService {
  private baseUrl = `${environment.apiUrl}/StudentMapsTuition`;

  constructor(private http: HttpClient) { }

  getAll() : Observable<BaseResponseModel<StudentMapsTuition[]>> {
    const apiUrl = `${this.baseUrl}/GetAllStudentMapTuition`;
    return this.http.get<BaseResponseModel<StudentMapsTuition[]>>(apiUrl);
  }
  getById(id: number): Observable<BaseResponseModel<StudentMapsTuition[]>> {
    const apiUrl = `${this.baseUrl}/GetByStudentId/${id}`;
    return this.http.get<BaseResponseModel<StudentMapsTuition[]>>(apiUrl);
  } 

  getByClassId(id: number): Observable<BaseResponseModel<StudentMapsTuition[]>> {
    const apiUrl = `${this.baseUrl}/GetByClassId/${id}`;
    return this.http.get<BaseResponseModel<StudentMapsTuition[]>>(apiUrl);
  } 
  getStudentMoneyMonth(id: number): Observable<BaseResponseModel<studentMoneyMonth[]>> {
    const apiUrl = `${this.baseUrl}/GetStudentMoneyMonth/${id}`;  
    return this.http.get<BaseResponseModel<studentMoneyMonth[]>>(apiUrl);
  } 
  create(payload: StudentMapsTuition) : Observable<BaseResponseModel<StudentMapsTuition>> {
    const apiUrl = `${this.baseUrl}/CreateStudentMapsTuition`;
    return this.http.post<BaseResponseModel<StudentMapsTuition>>(apiUrl, payload);
  }

  update(payload: StudentMapsTuition) : Observable<BaseResponseModel<StudentMapsTuition>> {
    const apiUrl = `${this.baseUrl}/Update`;
    return this.http.put<BaseResponseModel<StudentMapsTuition>>(apiUrl, payload);
  }

  delete(id: number) : Observable<BaseResponseModel<number>> {
    const apiUrl = `${this.baseUrl}/Delete/${id}`;
    return this.http.delete<BaseResponseModel<number>>(apiUrl);
  }
}
