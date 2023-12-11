import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from 'src/app/models/baseResponseModel';
import { TestModel } from 'src/app/models/test.model';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class TestServiceService {
  private baseUrl = `${environment.apiUrl}/Test`;
   
  constructor(private http: HttpClient) {}

  getAll(): Observable<BaseResponseModel<TestModel[]>> {
    const apiUrl = `${this.baseUrl}/GetAll`;
    return this.http.get<BaseResponseModel<TestModel[]>>(apiUrl);
  }
 
  exportexcel(): Observable<Blob> {
    const apiUrl = `${this.baseUrl}/ExportExcel`;
    return this.http.get(apiUrl, { responseType: 'blob' });
  }
  generatePDF(id: number): Observable<Blob> {
    const apiUrl = `${this.baseUrl}/GeneratePdf?id=${id}`;
    return this.http.get(apiUrl, { responseType: 'blob'});
  }
  getById(id: number): Observable<BaseResponseModel<TestModel>> {
    const apiUrl = `${this.baseUrl}/GetById/${id}`;
    return this.http.get<BaseResponseModel<TestModel>>(apiUrl);
  }
  sortbyasc(): Observable<BaseResponseModel<TestModel[]>> {
    const apiUrl = `${this.baseUrl}/sort/asc`;
    return this.http.get<BaseResponseModel<TestModel[]>>(apiUrl);
  }
  search(searchTerm: string): Observable<BaseResponseModel<TestModel[]>> {
    const apiUrl = `${this.baseUrl}/Search/${searchTerm}`;
    return this.http.get<BaseResponseModel<TestModel[]>>(apiUrl);
  }
  SendEmail(searchTerm: string): Observable<BaseResponseModel<string>> {
    const apiUrl = `${this.baseUrl}/SendMail/${searchTerm}`;
    return this.http.post<BaseResponseModel<string>>(apiUrl, null);
  }
  importExcel(file: File): Observable<BaseResponseModel<TestModel>> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const apiUrl = `${this.baseUrl}/ImportExcel`;
    return this.http.post<BaseResponseModel<TestModel>>(apiUrl, formData);
  }
  
  // PhanTrang(page = 1, pageSize = 4): Observable<PaginationSetModel<TestModel>> {
  //   const apiUrl = `${this.baseUrl}/GetAll?page=${page}&pageSize=${pageSize}`;
  //   return this.http.get<PaginationSetModel<TestModel>>(apiUrl);
  // }
  sortbydesc(): Observable<BaseResponseModel<TestModel[]>> {
    const apiUrl = `${this.baseUrl}/sort/desc`;
    return this.http.get<BaseResponseModel<TestModel[]>>(apiUrl);
  }
  create(payload: TestModel): Observable<BaseResponseModel<TestModel>> {
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('email', payload.email);
    formData.append('image', payload.image);
    const apiUrl = `${this.baseUrl}/Create`;
    return this.http.post<BaseResponseModel<TestModel>>(apiUrl, formData);
  }
  
  update(payload: TestModel): Observable<BaseResponseModel<TestModel>> {
    const apiUrl = `${this.baseUrl}/Update`;
    return this.http.put<BaseResponseModel<TestModel>>(apiUrl, payload);
  }

  delete(id: number): Observable<BaseResponseModel<number>> {
    const apiUrl = `${this.baseUrl}/Delete/${id}`;
    return this.http.delete<BaseResponseModel<number>>(apiUrl);
  }
}
