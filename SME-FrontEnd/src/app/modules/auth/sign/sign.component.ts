import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { singin } from 'src/app/models/help/singin';
import { TestScoreService } from 'src/app/services/admin/test-score.service';
import { TestServiceService } from 'src/app/services/admin/test-service.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent {
  user: singin = {
    profile: {
      name: '',
    },  
    username: '', 
    email: '',
    password: ''
  };
  constructor(private userSinginServices: TestScoreService, private router: Router,
    private toastr: ToastrService
  ) {
  }
  onSubmit() {
    const addDataPromise = this.userSinginServices.singinUser(this.user).subscribe(res => {
      this.router.navigate([''])
      this.toastr.success('Đăng ký tài khoản thành công')
    })
  }
}

