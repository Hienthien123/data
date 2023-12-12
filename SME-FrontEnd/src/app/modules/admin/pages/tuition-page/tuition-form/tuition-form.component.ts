import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TuitionModel } from 'src/app/models/tuition.model';
import { TuitionService } from 'src/app/services/admin/tuition.service';

@Component({
  selector: 'app-tuition-form',
  templateUrl: './tuition-form.component.html',
  styleUrls: ['./tuition-form.component.scss']
})
export class TuitionFormComponent implements OnInit{

  breadCrumb = [
    {
      title: 'Danh sách mức học phí',
      path: '/admin/tuitions'
    },
    {
      title: 'Thông tin mức học phí',
      path: ''
    }
  ]

  data: TuitionModel = {
    id: 0, 
    title: '', 
    amountOfMoney: 0, 
    note: '' 
    // organizationId: 1 //undefined if organizationId allow null value
  };

  itemId: string | undefined | null;
  constructor(private route: ActivatedRoute, private tuitionService: TuitionService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
    if(this.itemId) this.loadData(parseInt(this.itemId));
  }

  loadData(id: number) {
    const getDataPromise = this.tuitionService.getById(id).subscribe(response => {
      if(response.isSuccess){
        this.data = response.result as TuitionModel;
      }
    })
  }

  submit() {
    if (this.itemId) {
      // this.data.active = JSON.parse(this.data.active);
      const addDataPromise = this.tuitionService.update(this.data).subscribe(response => {
        if(response.isSuccess) {
          this.router.navigate(['/admin/tuitions']);
        }        
      })
    }else{
      // this.data.active = JSON.parse(this.data.active);
      const addDataPromise = this.tuitionService.create(this.data).subscribe(response => {
        if(response.isSuccess){
          this.router.navigate(['/admin/tuitions'])
        }
        else {
          if (!this.data.organizationId) {
            
            this.toastr.info('organizationId not be null!!');
          }
          console.log("Not response !!");
        }
      });
    }
  }

  
  
}
