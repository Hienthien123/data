import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new Subject<any>();

  // Observable để theo dõi sự thay đổi dữ liệu
  data$ = this.dataSubject.asObservable();
  constructor() { }
  initializeData(): void {
    this.dataSubject.next("tai");
    console.log("con worklll");
  }

  updateData(newData: any): void {
    this.dataSubject.next(newData);
  }

  
}
