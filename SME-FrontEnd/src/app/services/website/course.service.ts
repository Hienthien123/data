import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from 'src/app/models/baseResponseModel';
import { CourseModel } from 'src/app/models/doan/courseModel';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = `${environment.apiUrl}/course`;
  constructor(private http:HttpClient) { }
  getAll(payload: any):Observable<any> {
    const apiUrl = `${this.baseUrl}/getallcourseadmin`;
    return this.http.post<any>(apiUrl,payload);
  }
  search(payload: any): Observable<any>{
    const apiUrl = `${this.baseUrl}/searchcoursebykeyword`;
    return this.http.post<any>(apiUrl,payload);
  }

  get(payload: any):Observable<any>{
    const apiUrl = `${this.baseUrl}/getbyiduser`;
    return this.http.post<any>(apiUrl,payload)
  }



}
