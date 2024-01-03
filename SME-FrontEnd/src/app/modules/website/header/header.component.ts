import { Component } from '@angular/core';
import { UserService } from 'src/app/services/website/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  username :any
  constructor(private userService: UserService){
    
    const check = this.userService.checkjwt({authorization: localStorage.getItem('authorization')}).subscribe(res=>{
      if(res.isSuccess)
      {
        this.username = localStorage.getItem("username")
      }
      else
      localStorage.clear()
      
    })
  }
}
