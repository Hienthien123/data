import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { BaseResponseModel } from 'src/app/models/baseResponseModel';
import { EmployeeModel } from 'src/app/models/Employee.model';
import { QueryWithPaginationModel } from 'src/app/models/queryModels/queries.model';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { PaginatingSetModel } from 'src/app/models/paginatingSet.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = `${environment.apiUrl}/Employee`;

  getEmployee(
    queries?: QueryWithPaginationModel
  ): Observable<BaseResponseModel<PaginatingSetModel<EmployeeModel>>> {
    let params = new HttpParams();
    if (queries) {
      queries.pageNumber ? params.set('pageNumber', queries.pageNumber) : '';
      queries.pageSize ? params.set('pageSize', queries.pageSize) : '';
      queries.sortOrder ? params.set('sortOrder', queries.sortOrder) : '';

      Object.keys(queries.filter).forEach((key) => {
        params = params.set(key, queries.filter[key]);
      });
    }
    const apiUrl = `${this.baseUrl}/GetAllEmployees`;
    return this.http.get<BaseResponseModel<PaginatingSetModel<EmployeeModel>>>(
      apiUrl,
      { params }
    );
  }

  constructor(private http: HttpClient) {}
  getEmployeeById(id: number): Observable<BaseResponseModel<EmployeeModel>> {
    const apiUrl = `${this.baseUrl}/GetByIdEmployee/${id}`;
    return this.http.get<BaseResponseModel<EmployeeModel>>(apiUrl);
  }

  addEmloyee(
    payload: EmployeeModel
  ): Observable<BaseResponseModel<EmployeeModel>> {
    const apiUrl = `${this.baseUrl}/CreateEmployee`;
    return this.http.post<BaseResponseModel<EmployeeModel>>(apiUrl, payload);
  }

  updateEmployee(
    payload: EmployeeModel
  ): Observable<BaseResponseModel<EmployeeModel>> {
    const apiUrl = `${this.baseUrl}/UpdateEmployee`;
    return this.http.put<BaseResponseModel<EmployeeModel>>(apiUrl, payload);
  }
  delete(id?: number): Observable<BaseResponseModel<number>> {
    const apiUrl = `${this.baseUrl}/Delete/${id}`;
    return this.http.delete<BaseResponseModel<number>>(apiUrl);
  }
}
