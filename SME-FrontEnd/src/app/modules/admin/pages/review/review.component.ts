import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReviewModel } from 'src/app/models/doan/reviewModel';
import { ReviewService } from 'src/app/services/admin/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit{

  data: ReviewModel[] = []
  p: any = 1

  course_id = '123'

  constructor(private reviewService: ReviewService,private toastr:ToastrService,private route: ActivatedRoute,private router: Router){

  }
  ngOnInit(): void {
    this.loadData()
  }
  loadData(): void {
    const x = this.route.snapshot.paramMap.get('course_id');
    
    if(x!==null){
      this.course_id = x
      const courseId ={
        _id: x,
        authorization: localStorage.getItem('authorization')
      }
    const xx = this.reviewService.getAll(courseId).subscribe(res => {
      if(res.isSuccess) {
        console.log(res.result);
        if(res.token)
localStorage.setItem('authorization',res.token)
        this.data = res.result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        this.toastr.info('Success loading')
        
      }
      else{
        this.toastr.error(res.message);
      }
    })
    }
    
  }
  deleteItem(item:ReviewModel):void{
    const del = {
      _id: item._id,
      authorization: localStorage.getItem('authorization')
    }
    if(confirm(`Xác nhận xóa ${item._id}`)){
      const deletePromise = this.reviewService.delete(del).subscribe(res => {
        if(res.isSuccess){
          this.toastr.info('Xóa thành công');
          const x = this.route.snapshot.paramMap.get('course_id');
          if(x!==null) 
          {
            this.loadData()
          }
        } else{
          this.toastr.error(res.message)
        }
      })
    }
  
  }
}
