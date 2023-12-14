import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from 'src/app/models/baseResponseModel';
import { ChapterModel } from 'src/app/models/doan/chapterModel';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  private baseUrl = `${environment.apiUrl}/chapter`;
  constructor(private http:HttpClient) { }
  getAll(payload: any):Observable<BaseResponseModel<ChapterModel[]>> {
    const apiUrl = `${this.baseUrl}/getbycourse`;
    return this.http.post<BaseResponseModel<ChapterModel[]>>(apiUrl,payload);
  }
  getById(payload: any):Observable<BaseResponseModel<ChapterModel>> {
    const apiUrl = `${this.baseUrl}/getbyid`;
    return this.http.post<BaseResponseModel<ChapterModel>>(apiUrl,payload);
  }

  create(payload: any):Observable<BaseResponseModel<ChapterModel>> {
    const apiUrl = `${this.baseUrl}/createchapter`;
    return this.http.post<BaseResponseModel<ChapterModel>>(apiUrl,payload);
  }

  update(payload: any):Observable<BaseResponseModel<ChapterModel>> {
    const apiUrl = `${this.baseUrl}/updatechapter`;
    return this.http.post<BaseResponseModel<ChapterModel>>(apiUrl,payload);
  }

  delete(payload: any):Observable<BaseResponseModel<ChapterModel>> {
    const apiUrl = `${this.baseUrl}/deletechapter`;
    return this.http.post<BaseResponseModel<ChapterModel>>(apiUrl,payload);
  }
}
