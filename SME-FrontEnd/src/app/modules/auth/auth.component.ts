import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { login } from 'src/app/models/help/userlogin';
import { TestScoreService } from 'src/app/services/admin/test-score.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  logInData: login = {
    email: '',
    password: '',
     token: '',
    roles: [],
  }
  ngOnInit() {
  }
  constructor(private loginServices: TestScoreService,
    private toastr: ToastrService, private router: Router) {
  }
  login() {
    const loginSub = this.loginServices.loginUser(this.logInData).subscribe(res => {
      if (res.token) {
        if (res.role && res.role.includes('ADMIN')) {
          this.toastr.success('Đăng Nhập Thành Công')
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.router.navigate(['/admin'])
        }
        else {
          this.toastr.success('Đăng nhập thành công');
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.router.navigate(['/website'])
          console.log(res)
        }
      }
      else {
        this.toastr.error('Đăng nhập thất bại')
      }
    })
  }
}
