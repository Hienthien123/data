import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CourseModel } from 'src/app/models/doan/courseModel';
import { KhoaHocService } from 'src/app/services/admin/khoa-hoc.service';
import { ToastrService } from "ngx-toastr";
@Component({
  selector: 'app-khoa-hoc',
  templateUrl: './khoa-hoc.component.html',
  styleUrls: ['./khoa-hoc.component.scss']
})
export class KhoaHocComponent implements OnInit {

  data: CourseModel[] = []
  p: any = 1

  constructor(private KhoaHocService_: KhoaHocService, private toastr: ToastrService, private router: Router) {
  }


  ngOnInit(): void {
    this.loadData()
    console.log(this.data)
  }
  loadData(): void {
    const auth = {
      authorization: localStorage.getItem('authorization'),
    }
    const x = this.KhoaHocService_.getAll(auth).subscribe(res => {
      if (res.isSuccess) {
        this.data = res.result
        this.toastr.info('Success loading')
        if (res.token)
          localStorage.setItem('authorization', res.token)
      }
      else {
        this.toastr.error(res.message);
      }
    })
  }
  deleteItem(item: CourseModel) {
    const del = {
      _id: item._id,
      authorization: localStorage.getItem('authorization')
    }
    if (confirm(`Xác nhận xóa ${item.title}`)) {
      const deletePromise = this.KhoaHocService_.delete(del).subscribe(res => {
        if (res.isSuccess) {
          this.toastr.info('Xóa thành công');
          this.loadData();
        } else {
          this.toastr.error(res.message);
        }
      })
    }
  }

  protected readonly parseInt = parseInt;
}
