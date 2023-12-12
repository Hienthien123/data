import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from 'src/app/models/baseResponseModel';
import { singin } from 'src/app/models/help/singin';
import { login } from 'src/app/models/help/userlogin';
import { TestScoreModel } from 'src/app/models/testScore.model';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TestScoreService {
  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<BaseResponseModel<TestScoreModel[]>> {
    const apiUrl = `${this.baseUrl}/GetAll`;
    return this.http.get<BaseResponseModel<TestScoreModel[]>>(apiUrl);
  }

  getByClassId(id: number): Observable<BaseResponseModel<TestScoreModel[]>> {
    const apiUrl = `${this.baseUrl}/GetInfoByIdFkClassId/${id}`;
    return this.http.get<BaseResponseModel<TestScoreModel[]>>(apiUrl);
  }

  update(payload: TestScoreModel): Observable<BaseResponseModel<TestScoreModel>> {
    const apiUrl = `${this.baseUrl}/Update`;
    return this.http.put<BaseResponseModel<TestScoreModel>>(apiUrl, payload);
  }

  loginUser(userlogin: login): Observable<any> {
    const apiUrl = `${this.baseUrl}/login`;
    return this.http.post(apiUrl, userlogin);
  }
  singinUser(singinUser: singin): Observable<any> {
    const apiUrl = `${this.baseUrl}/signup`
    return this.http.post(apiUrl, singinUser)
  }
}
