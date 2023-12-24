import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CourseService } from './course.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private courseSubject = new Subject<any>();

  // Observable để theo dõi sự thay đổi dữ liệu
  dataCourse$ = this.courseSubject.asObservable();
  constructor(private courseService: CourseService) { }
  initializeData(): void {
    this.courseService.search({keyword: ''}).subscribe(res=>{
      if(res.isSuccess){
        // console.log(res.result)
        this.courseSubject.next(res.result)
      }
    })
    // console.log(this.courseSubject)
  }

  updateData(newData: any): void {
    this.courseService.search(newData).subscribe(res=>{
      if(res.isSuccess){
        this.courseSubject.next(res.result)
      }
    })

  }

  
}
