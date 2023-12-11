import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from 'src/app/models/baseResponseModel';
import { TestScoreModel } from 'src/app/models/testScore.model';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TestScoreService {
  private baseUrl = `${environment.apiUrl}/TestScore`;

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
}
