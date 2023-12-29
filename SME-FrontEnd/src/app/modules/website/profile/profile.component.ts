import { Component,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/website/course.service';
import { PaymentService } from 'src/app/services/website/payment.service';
import { UserService } from 'src/app/services/website/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: any
  course_count: any
  constructor(private paymentService: PaymentService,private userService: UserService,private route: ActivatedRoute,private router: Router,){
    this.user = JSON.parse(localStorage.getItem('user')as string)
    this.paymentService.getUserPayment({authorization : localStorage.getItem("authorization")}).subscribe(res=>{
      if(res.isSuccess)
        this.course_count = res.result.length
    })

  }

}
