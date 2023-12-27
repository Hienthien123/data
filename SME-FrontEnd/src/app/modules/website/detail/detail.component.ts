import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/website/course.service';
import { PaymentService } from 'src/app/services/website/payment.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit{
  data: any
  constructor(private paymentService: PaymentService,private courseService: CourseService,private route: ActivatedRoute,private router: Router,){}
  ngOnInit(): void {
    this.loadData()
  }
  loadData(){
    const x = this.route.snapshot.paramMap.get('_id')
    if(x!==null){
      const id ={
        _id : x
      }
      
      this.courseService.get(id).subscribe(res=>{
        if(res.isSuccess){
          this.data = res.result
        }
      })
      
    }
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
