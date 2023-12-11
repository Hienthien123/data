import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SubjectGroupModel } from 'src/app/models/subjectGroup.model';

import { SubjectgroupServiceService } from 'src/app/services/admin/subjectgroup-service.service';
@Component({
  selector: 'app-subject-group',
  templateUrl: './subject-group.component.html',
  styleUrls: ['./subject-group.component.scss'],
})
export class SubjectGroupComponent implements OnInit {
  subjectgroupData: SubjectGroupModel[] = [];
  breadCrumb = [
    {
      title: 'Danh sách ngành học ',
      path: '/admin/subject-group',
    },
  ];
  constructor(
    private subjectgroupservice: SubjectgroupServiceService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const getAllPromise = this.subjectgroupservice.getAll().subscribe((res) => {
      if (res.isSuccess) {
        this.toastr.info('Tải dữ liệu thành công');
        this.subjectgroupData = res.result as SubjectGroupModel[];
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  deleteItem(item: SubjectGroupModel) {
    if (confirm(`Xác nhận xóa ${item.name}`)) {
      const deletePromise = this.subjectgroupservice
        .delete(item.id)
        .subscribe((res) => {
          if (res.isSuccess) {
            this.toastr.info('Xóa thành công');
            this.loadData();
          } else {
            this.toastr.error(res.message);
          }
        });
    }
  }
}
