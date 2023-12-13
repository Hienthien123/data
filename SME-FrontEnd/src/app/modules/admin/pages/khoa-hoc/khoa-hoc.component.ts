import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { CourseModel } from 'src/app/models/doan/courseModel';
import { KhoaHocService } from 'src/app/services/admin/khoa-hoc.service';
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-khoa-hoc',
  templateUrl: './khoa-hoc.component.html',
  styleUrls: ['./khoa-hoc.component.scss']
})
export class KhoaHocComponent implements OnInit{

  data: CourseModel[] = []
  testAuth = {
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ4ODlmMTRmYzQzZjk3NGJhYjJjMzkiLCJyb2xlcyI6IlVTRVIsSU5TVFJVQ1RPUixBRE1JTiIsInVzZXJuYW1lIjoidGRpZGNkY2RkZCIsInByb2ZpbGUiOiJ7IG5hbWU6ICd0YTMnIH0iLCJlbWFpbCI6ImVtY2RpbEBlbWFpbC5jb20iLCJpYXQiOjE3MDIzMzkxOTAsImV4cCI6MTcwMjM5OTE5MH0.tjlbCEtQUGso2uM1sWqW3EGpBzEWoD36AUDrAzcJWwI'
  }
  constructor(private KhoaHocService_: KhoaHocService, private toastr:ToastrService,private router: Router){
  }


  ngOnInit(): void {
    this.loadData()
    console.log(this.data)
  }
  loadData(): void {
    const x = this.KhoaHocService_.getAll(this.testAuth).subscribe(res => {
      if(res.isSuccess) {
        this.data = res.result
        this.toastr.info('Success loading')
        // console.log(res.result)
      }
      else{
        this.toastr.error(res.message);
      }
    })
  }
  deleteItem(item: CourseModel){
    const del = {
      _id : item._id,
      authorization: this.testAuth.authorization
    }
    if(confirm(`Xác nhận xóa ${item.title}`)){
      const deletePromise = this.KhoaHocService_.delete(del).subscribe(res => {
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
