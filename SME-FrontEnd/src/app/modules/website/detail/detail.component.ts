import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/website/course.service';
import { DataService } from 'src/app/services/website/data.service';
import { PaymentService } from 'src/app/services/website/payment.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy{
  @Input() id:any
  data: any
  reviewData: any
  overal: any
  reviewCount: any = 0
  private dataSubscription: any
  constructor(private dataService: DataService, private paymentService: PaymentService,private courseService: CourseService,private route: ActivatedRoute,private router: Router,){
    
  }
  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
  ngOnInit(): void {
    if(this.id)
    this.data = this.courseService.get({_id: this.id}).subscribe(res=>{
      if(res.isSuccess)
        this.data = res.result
      console.log(this.data)
  })
    this.dataService.initialReviewlData({_id: this.id})
    this.dataSubscription = this.dataService.dataReview$.subscribe((newData)=>{
      this.reviewData = newData
      let sum = 0
      for (let i =0;i<this.reviewData.length;i++){
        sum += this.reviewData[i].rating
      }
      if (this.reviewData.length!==0)
        this.overal = sum/this.reviewData.length
      this.reviewCount = this.reviewData.length
    })


  }


  buycourse(_id:string):void{
    const send_to_server = {
      authorization: localStorage.getItem('authorization'),
      course_id: _id
    }
    const get_url = this.paymentService.create(send_to_server).subscribe(res =>{
      if(res.isSuccess){
        console.log(res.result)
        window.location = res.result
      }
    })

  }

}
