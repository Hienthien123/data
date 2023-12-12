import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from 'src/app/models/baseResponseModel';
import { PaginatingSetModel } from 'src/app/models/paginatingSet.model';
import { QueryWithPaginationModel } from 'src/app/models/queryModels/queries.model';
import { StudentModel } from 'src/app/models/student.model';
import { TestModel } from 'src/app/models/test.model';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = `${environment.apiUrl}/Student`;

  constructor(private http: HttpClient) { }
  
  getAll() : Observable<BaseResponseModel<StudentModel[]>> {
    const apiUrl = `${this.baseUrl}/GetAll`;
    return this.http.get<BaseResponseModel<StudentModel[]>>(apiUrl);
  }
  getStudents(queries?: QueryWithPaginationModel) : Observable<BaseResponseModel<PaginatingSetModel<StudentModel>>> {
    let params = new HttpParams()
    if(queries){
      queries.pageNumber ? params.set('pageNumber', queries.pageNumber) : '';
      queries.pageSize ? params.set('pageSize', queries.pageSize) : '';
      queries.sortOrder ? params.set('sortOrder', queries.sortOrder) : '';      
      
      Object.keys(queries.filter).forEach((key) => {
        params = params.set(key, queries.filter[key]);
      });
    }

    const apiUrl = `${this.baseUrl}/GetStudents`;
    return this.http.get<BaseResponseModel<PaginatingSetModel<StudentModel>>>(apiUrl, {params});
  }

  getStudentById(id: number) : Observable<BaseResponseModel<StudentModel>>{
    const apiUrl = `${this.baseUrl}/GetStudentById/${id}`;
    return this.http.get<BaseResponseModel<StudentModel>>(apiUrl);
  }

  addStudent(payload: StudentModel) : Observable<BaseResponseModel<StudentModel>>{
    const apiUrl = `${this.baseUrl}/CreateStudent`;
    return this.http.post<BaseResponseModel<StudentModel>>(apiUrl, payload);
  }

  updateStudent(payload: StudentModel) : Observable<BaseResponseModel<StudentModel>>{
    const apiUrl = `${this.baseUrl}/UpdateStudent`;
    return this.http.put<BaseResponseModel<StudentModel>>(apiUrl, payload);
  }

  deleteStudent(id: number) : Observable<BaseResponseModel<number>>{
    const apiUrl = `${this.baseUrl}/DeleteStudent/${id}`;
    return this.http.delete<BaseResponseModel<number>>(apiUrl);
  }
}
