import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChucDanhModel } from 'src/app/models/chucDanhModel';
import { ChucDanhServiceService } from 'src/app/services/admin/chuc-danh-service.service';

@Component({
  selector: 'app-chuc-danh',
  templateUrl: './chuc-danh.component.html',
  styleUrls: ['./chuc-danh.component.scss']
})
export class ChucDanhComponent implements OnInit{

  chucDanhData: ChucDanhModel[] = [];

  constructor(private chucDanhService: ChucDanhServiceService, private toastr: ToastrService) {};

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const getAllPromise = this.chucDanhService.getAll()
          .subscribe(response => {
            if (response.isSuccess) {
              this.toastr.info('Tải dữ liệu thành công');
              this.chucDanhData = response.result as ChucDanhModel[];
              console.log(this.chucDanhData);
            }
            else {
              this.toastr.error(response.message);
            }
          })
  }

  deleteItem(item: ChucDanhModel) {
    if (confirm(`Xác nhận xóa ${item.titleName}`)) {
      const deletePromise = this.chucDanhService.delete(item.id).subscribe(response => {
        if (response.isSuccess) {
          this.toastr.info('Xóa thành công');
          this.loadData();
        }
        else {
          this.toastr.error(response.message);
        }
      })
    }
  }

  updateItem(item: ChucDanhModel) {}

}