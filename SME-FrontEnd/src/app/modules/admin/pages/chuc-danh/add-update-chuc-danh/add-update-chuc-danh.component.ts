import { HttpClient } from '@angular/common/http';
import { parseHostBindings } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChucDanhModel } from 'src/app/models/chucDanhModel';
import { ChucDanhServiceService } from 'src/app/services/admin/chuc-danh-service.service';

@Component({
  selector: 'app-add-update-chuc-danh',
  templateUrl: './add-update-chuc-danh.component.html',
  styleUrls: ['./add-update-chuc-danh.component.scss']
})
export class AddUpdateChucDanhComponent implements OnInit {
  breadCrumb = [
    {
      title: 'Danh sách chức danh',
      path: '/admin/titles'
    },
    {
      title: 'Thông tin chức danh',
      path: ''
    }
  ]

  data: ChucDanhModel = {
    id: 0, 
    titleName: '', 
    titleCode: '', 
    note: ''
  };

  itemId: string | undefined | null;
  constructor(private route: ActivatedRoute, private chucDanhService: ChucDanhServiceService, private router: Router) {}

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
    if(this.itemId) this.loadData(parseInt(this.itemId));
  }

  loadData(id: number) {
    const getDataPromise = this.chucDanhService.getById(id).subscribe(response => {
      if(response.isSuccess){
        this.data = response.result as ChucDanhModel;
      }
    })
  }

  submit() {
    if (this.itemId) {
      // this.data.active = JSON.parse(this.data.active);
      const addDataPromise = this.chucDanhService.update(this.data).subscribe(response => {
        if(response.isSuccess) {
          this.router.navigate(['/admin/titles'])
        }        
      })
    }else{
      // this.data.active = JSON.parse(this.data.active);
      const addDataPromise = this.chucDanhService.create(this.data).subscribe(response => {
        if(response.isSuccess){
          this.router.navigate(['/admin/titles'])
        }
        else {
          console.log("Not response !!");
        }
      });
    }
  }

}
