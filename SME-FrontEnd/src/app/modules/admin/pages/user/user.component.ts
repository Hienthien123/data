import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/doan/userModel';
import { UserService } from 'src/app/services/admin/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  data: UserModel[] = []

  constructor(private userService: UserService,private toastr:ToastrService,private router: Router){
  }
  ngOnInit(): void {
    this.loadData();
  }

  loadData():void{
    const auth ={
      authorization : localStorage.getItem('authorization'),
    }
    const x = this.userService.getAll(auth).subscribe(res => {
      if(res.isSuccess) {
        this.data = res.result
        this.toastr.info('Success loading')
        console.log(this.data)
        localStorage.setItem('authorization',res.token)
      }
      else{
        this.toastr.error(res.message);
      }
    })
  }

  deleteItem(item: UserModel){
    const del = {
      _id : item._id,
      authorization: localStorage.getItem('authorization')
    }
    if(confirm(`Xác nhận vô hiệu hóa ${item.profile.name}`)){
      const deletePromise = this.userService.delete(del).subscribe(res => {
        if(res.isSuccess){
          this.toastr.info('Vô hiệu hóa thành công');
          this.loadData();
        } else{
          this.toastr.error(res.message);
        }
      })
    }
  }

  protected readonly parseInt = parseInt;


}
