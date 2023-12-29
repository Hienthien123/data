import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/website/payment.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{
  constructor(private paymentService: PaymentService,private route: ActivatedRoute,private router: Router,private toastr: ToastrService){}

  ngOnInit(): void {
      const _id = this.route.snapshot.paramMap.get('_id')
      const hash = this.route.snapshot.paramMap.get('hash')
      if(_id && hash){
        const payload ={
          authorization: localStorage.getItem('authorization'),
          _id:_id,
          hash:hash,
        }
        this.paymentService.confirm(payload).subscribe(res=>{
          if(res.isSuccess){
            this.toastr.info("success")
            this.router.navigate(['/website'])
          }
          else{
            this.toastr.info("payment canceled")
          }
        })
      }
      else this.toastr.info("payment canceled")
  }
}
