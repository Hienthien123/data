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
  username: any
  email: any
  name: any
  course_count: any
  constructor(private paymentService: PaymentService,private userService: UserService,private route: ActivatedRoute,private router: Router,){
    this.loadData()

  }
  loadData():void{

    this.user = JSON.parse(localStorage.getItem('user')as string)
    this.user.profile.name = localStorage.getItem('name')
    this.paymentService.getUserPayment({authorization : localStorage.getItem("authorization")}).subscribe(res=>{
      if(res.isSuccess)
        this.course_count = res.result.length
    })
    this.name = this.user.profile.name
  }

  changeUserInfo(){
    let user_data = {
      authorization : localStorage.getItem("authorization"),
      name: this.user.profile.name,
    }
    console.log(user_data)
  this.userService.changeInfo(user_data).subscribe(res=>{
    if(res.isSuccess)
    {
      localStorage.setItem('name', this.user.profile.name)
      this.loadData()
      
    }
  })

  }

}
