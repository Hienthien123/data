import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from 'src/app/models/baseResponseModel';
import { LocationModel } from 'src/app/models/location.model';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private baseUrl = `${environment.apiUrl}/Location`;

  constructor(private http: HttpClient) { }

  getProvinces(): Observable<BaseResponseModel<LocationModel[]>>{
    const apiUrl = `${this.baseUrl}/GetProvinces`;
    return this.http.get<BaseResponseModel<LocationModel[]>>(apiUrl);
  }

  getDistrict(provinceId: number): Observable<BaseResponseModel<LocationModel[]>>{
    const apiUrl = `${this.baseUrl}/GetDistricts/${provinceId}`;
    return this.http.get<BaseResponseModel<LocationModel[]>>(apiUrl);
  }

  getWards(districtId: number): Observable<BaseResponseModel<LocationModel[]>>{
    const apiUrl = `${this.baseUrl}/GetWards/${districtId}`;
    return this.http.get<BaseResponseModel<LocationModel[]>>(apiUrl);
  }
}
