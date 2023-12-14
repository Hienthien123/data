import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from 'src/app/models/baseResponseModel';
import { LessonModel } from 'src/app/models/doan/lessonModel';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private baseUrl = `${environment.apiUrl}/lesson`;
  constructor(private http:HttpClient) { }
  getAll(payload: any):Observable<BaseResponseModel<LessonModel[]>> {
    const apiUrl = `${this.baseUrl}/getbychapter`;
    return this.http.post<BaseResponseModel<LessonModel[]>>(apiUrl,payload);
  }
  getById(payload: any):Observable<BaseResponseModel<LessonModel>> {
    const apiUrl = `${this.baseUrl}/getbyid`;
    return this.http.post<BaseResponseModel<LessonModel>>(apiUrl,payload);
  }

  create(payload: any):Observable<BaseResponseModel<LessonModel>> {
    const apiUrl = `${this.baseUrl}/createlesson`;
    return this.http.post<BaseResponseModel<LessonModel>>(apiUrl,payload);
  }

  update(payload: any):Observable<BaseResponseModel<LessonModel>> {
    const apiUrl = `${this.baseUrl}/updatelesson`;
    return this.http.post<BaseResponseModel<LessonModel>>(apiUrl,payload);
  }

  delete(payload: any):Observable<BaseResponseModel<LessonModel>> {
    const apiUrl = `${this.baseUrl}/deletelesson`;
    return this.http.post<BaseResponseModel<LessonModel>>(apiUrl,payload);
  }
}
