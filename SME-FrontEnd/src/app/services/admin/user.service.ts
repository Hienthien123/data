import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from 'src/app/models/baseResponseModel';
import { UserModel } from 'src/app/models/doan/userModel';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.apiUrl}/user`;
  constructor(private http:HttpClient) { }
  getAll(payload: any):Observable<BaseResponseModel<UserModel[]>> {
    const apiUrl = `${this.baseUrl}/getalluser`;
    return this.http.post<BaseResponseModel<UserModel[]>>(apiUrl,payload);
  }
  getById(payload: any):Observable<BaseResponseModel<UserModel>> {
    const apiUrl = `${this.baseUrl}/getuserbyid`;
    return this.http.post<BaseResponseModel<UserModel>>(apiUrl,payload);
  }

  update(payload: any):Observable<BaseResponseModel<UserModel>> {
    const apiUrl = `${this.baseUrl}/changeuserinfo`;
    return this.http.post<BaseResponseModel<UserModel>>(apiUrl,payload);
  }

  delete(payload: any):Observable<BaseResponseModel<UserModel>> {
    const apiUrl = `${this.baseUrl}/disableuser`;
    return this.http.post<BaseResponseModel<UserModel>>(apiUrl,payload);
  }

  checkAdmin(payload: any):Observable<any> {
    
    const apiUrl = `${environment.apiUrl}/auth/checkjwtadmin`;
    // console.log(apiUrl)
    return this.http.post<any>(apiUrl,payload);
  }
}
