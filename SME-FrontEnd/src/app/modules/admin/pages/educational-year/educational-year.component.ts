import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EducationalYearModel } from 'src/app/models/educationalYear.model';
import { EducationalYearService } from 'src/app/services/admin/educational-year.service';

@Component({
  selector: 'app-educational-year',
  templateUrl: './educational-year.component.html',
  styleUrls: ['./educational-year.component.scss']
})
export class EducationalYearComponent implements OnInit{

  breadCrumb = [
    {
      title: 'Năm học',
      path: ''
    }
  ]
  educationalYearData : EducationalYearModel[] = [];

  constructor(private educationYearService: EducationalYearService, private toastr: ToastrService) {}
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const getAllPromise = this.educationYearService.getAll()
          .subscribe(response => {
            if (response.isSuccess) {
              this.toastr.info('Tải dữ liệu thành công');
              this.educationalYearData = response.result as EducationalYearModel[];
              console.log(this.educationalYearData);
            }
            else {
              this.toastr.error(response.message);
            }
          })
  }

  deleteItem(item: EducationalYearModel) {
    if (confirm(`Xác nhận xóa ${item.yearTitle}`)) {
      const deletePromise = this.educationYearService.delete(item.id).subscribe(response => {
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

}
