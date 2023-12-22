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
  search(payload: any):Observable<BaseResponseModel<CourseModel[]>> {
    const apiUrl = `${this.baseUrl}/getallcourseadmin`;
    return this.http.post<BaseResponseModel<CourseModel[]>>(apiUrl,payload);
  }

}
