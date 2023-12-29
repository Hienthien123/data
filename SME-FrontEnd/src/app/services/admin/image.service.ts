import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseUrl = `${environment.apiUrl}/image`;
  constructor(private http:HttpClient) { }
  uploadAvatar(payload: any):Observable<any> {
    let formData = new FormData()
    formData.append("authorization",payload.authorization)
    formData.append("file",payload.file)
    const apiUrl = `${this.baseUrl}/uploadcourse`;
    return this.http.post(apiUrl,formData);
  }
}
