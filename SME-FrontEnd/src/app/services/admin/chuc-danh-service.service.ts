import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from 'src/app/models/baseResponseModel';
import { ChucDanhModel } from 'src/app/models/chucDanhModel';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ChucDanhServiceService {

  private baseUrl = `${environment.apiUrl}/OrganizationPersonaTitle`;

  constructor(private http: HttpClient) { }

  // GET
  // /api/ChucDanh/GetAll

  getAll(): Observable<BaseResponseModel<ChucDanhModel[]>> {
    const apiUrl = `${this.baseUrl}/GetAll`;
    return this.http.get<BaseResponseModel<ChucDanhModel[]>>(apiUrl);
  }


  // GET
  // /api/ChucDanh/GetById/{id}
  getById(id: number): Observable<BaseResponseModel<ChucDanhModel>> {
    const apiUrl = `${this.baseUrl}/GetById/${id}`;
    return this.http.get<BaseResponseModel<ChucDanhModel>>(apiUrl);
  }

  // POST
  // /api/ChucDanh/Create
  create(payload: ChucDanhModel): Observable<BaseResponseModel<ChucDanhModel>> {
    const apiUrl = `${this.baseUrl}/Create`;
    return this.http.post<BaseResponseModel<ChucDanhModel>>(apiUrl, payload);
  }
  // PUT
  // /api/ChucDanh/Update
  update(payload: ChucDanhModel) : Observable<BaseResponseModel<ChucDanhModel>> {
    const apiUrl = `${this.baseUrl}/Update`;
    return this.http.put<BaseResponseModel<ChucDanhModel>>(apiUrl, payload);
  }

  // DELETE
  // /api/ChucDanh/Delete/{id}
  delete(id: number) : Observable<BaseResponseModel<number>> {
    const apiUrl = `${this.baseUrl}/Delete/${id}`;
    return this.http.delete<BaseResponseModel<number>>(apiUrl);
  }
}
