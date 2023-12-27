import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = `${environment.apiUrl}/review`;
  constructor(private http:HttpClient) { }

  
}
