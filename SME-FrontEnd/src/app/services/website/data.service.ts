import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CourseService } from './course.service';
import { ReviewService } from './review.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private courseSubject = new Subject<any>();

  dataCourse$ = this.courseSubject.asObservable();
  constructor(private courseService: CourseService, private reviewService: ReviewService) { }
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

  private reviewSubject = new Subject<any>();

  dataReview$ = this.reviewSubject.asObservable();

  initialReviewlData(id: any):void{
    this.reviewService.getAll(id).subscribe(res=>{
      if(res.isSuccess){
        this.reviewSubject.next(res.result)
      }
    })
  }  
}
