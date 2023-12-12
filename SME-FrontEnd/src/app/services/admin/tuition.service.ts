import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from 'src/app/models/baseResponseModel';
import { PaginatingSetModel } from 'src/app/models/paginatingSet.model';
import { PaginatingQueryModel } from 'src/app/models/queryModels/paginating-query.model';
import { QueryWithPaginationModel } from 'src/app/models/queryModels/queries.model';
import { TuitionModel } from 'src/app/models/tuition.model';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TuitionService {
  private baseUrl = `${environment.apiUrl}/Tuition`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<BaseResponseModel<TuitionModel[]>> {
    const apiUrl = `${this.baseUrl}/GetTuitions`;
    return this.http.get<BaseResponseModel<TuitionModel[]>>(apiUrl);
  }


  // GET
  // /api/ChucDanh/GetById/{id}
  getById(id: number): Observable<BaseResponseModel<TuitionModel>> {
    const apiUrl = `${this.baseUrl}/GetTuitionById/${id}`;
    return this.http.get<BaseResponseModel<TuitionModel>>(apiUrl);
  }

  // POST
  // /api/ChucDanh/Create
  create(payload: TuitionModel): Observable<BaseResponseModel<TuitionModel>> {
    const apiUrl = `${this.baseUrl}/CreateTuition`;
    return this.http.post<BaseResponseModel<TuitionModel>>(apiUrl, payload);
  }
  // PUT
  // /api/ChucDanh/Update
  update(payload: TuitionModel) : Observable<BaseResponseModel<TuitionModel>> {
    const apiUrl = `${this.baseUrl}/UpdateTuition`;
    return this.http.put<BaseResponseModel<TuitionModel>>(apiUrl, payload);
  }

  // DELETE
  // /api/ChucDanh/Delete/{id}
  delete(id: number) : Observable<BaseResponseModel<number>> {
    const apiUrl = `${this.baseUrl}/Delete/${id}`;
    return this.http.delete<BaseResponseModel<number>>(apiUrl);
  }


}
