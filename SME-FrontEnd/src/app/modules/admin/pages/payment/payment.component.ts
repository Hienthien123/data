import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentModel } from 'src/app/models/doan/paymentModel';
import { PaymentService } from 'src/app/services/admin/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{
  data: PaymentModel[] = []

  constructor(private paymentService: PaymentService, private toastr:ToastrService,private router: Router){
  }


  ngOnInit(): void {
    this.loadData()
    console.log(this.data)
  }
  loadData(): void {
    const auth ={
      authorization : localStorage.getItem('authorization'),
    }
    const x = this.paymentService.getAll(auth).subscribe(res => {
      if(res.isSuccess) {
        this.data = res.result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        this.toastr.info('Success loading')
        localStorage.setItem('authorization',res.token)
        console.log(this.data)
      }
      else{
        this.toastr.error(res.message);
      }
    })
  }

  deleteItem(item: PaymentModel){
    const del = {
      _id : item._id,
      authorization: localStorage.getItem('authorization')
    }
    if(confirm(`Xác nhận xóa ${item._id}`)){
      const deletePromise = this.paymentService.delete(del).subscribe(res => {
        if(res.isSuccess){
          this.toastr.info('Xóa thành công');
          this.loadData();
        } else{
          this.toastr.error(res.message);
        }
      })
    }
  }

  protected readonly parseInt = parseInt;
}
