import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/website/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  constructor(private userService: UserService,private route: ActivatedRoute,private router: Router,){
    let auth_data ={
      authorization : localStorage.getItem("authorization")
    }
    this.userService.checkjwt(auth_data).subscribe(res=>{
        if(!res.isSuccess)
          this.router.navigate(['/auth'])
        localStorage.setItem('authorization',res.token)
    })
  }

}
