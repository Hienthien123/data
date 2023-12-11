import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SubjectModel } from 'src/app/models/Subject.model';
import { ClassModel } from 'src/app/models/class.model';
import { GradeModel } from 'src/app/models/grade.model';
import { SubjectGroupModel } from 'src/app/models/subjectGroup.model';
import { ClassServiceService } from 'src/app/services/admin/class-service.service';
import { GradeService } from 'src/app/services/admin/grade.service';
import { SubjectServiceService } from 'src/app/services/admin/subject-service.service';
import { SubjectgroupServiceService } from 'src/app/services/admin/subjectgroup-service.service';

@Component({
  selector: 'app-class-page',
  templateUrl: './class-page.component.html',
  styleUrls: ['./class-page.component.scss'],
})
export class ClassPageComponent implements OnInit {
  classdata: ClassModel[] = [];
  gradeData: GradeModel[] = [];
  subjectgroupData: SubjectGroupModel[] = [];
  subjectData: SubjectModel[] = [];
  subjectMap: { [id: number]: string } = {};
  subjectgroupMap: { [id: number]: string } = {};
  gradeMap:{ [id: number]: string } = {};
  breadCrumb = [
    {
      title: 'Danh sách lớp',
      path: '/admin/class',
    },
  ];

  constructor(
    private classService: ClassServiceService,
    private gradeservice: GradeService,
    private sgroupsService: SubjectgroupServiceService,
    private subjectService: SubjectServiceService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loadData();
    this.loadgradeNames();
    this.loadsubjectgroupNames();
    this.loadsubjectNames();
  }
  loadgradeNames() {
    this.gradeservice.getAll().subscribe((res) => {
      if (res.isSuccess) {
        const grade: GradeModel[] = res.result as GradeModel[];
        grade.forEach((gr) => {
          this.gradeMap[gr.id] = gr.name;
        });
      }
    });
  }
  loadsubjectNames() {
    this.subjectService.getAll().subscribe((res) => {
      if (res.isSuccess) {
        const subject: SubjectModel[] = res.result as SubjectModel[];
        subject.forEach((s) => {
          this.subjectMap[s.id] = s.subjectName;
        });
      }
    });
  }
  loadsubjectgroupNames() {
    this.sgroupsService.getAll().subscribe((res) => {
      if (res.isSuccess) {
        const sgroup: SubjectGroupModel[] = res.result as SubjectGroupModel[];
        sgroup.forEach((sg) => {
          this.subjectgroupMap[sg.id] = sg.name;
        });
      }
    });
  }
  loadData() {
    const getAllPromise = this.classService.getAll().subscribe((res) => {
      if (res.isSuccess) {
        this.toastr.info('Tải dữ liệu thành công');
        this.classdata = res.result as ClassModel[];
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  deleteItem(item: ClassModel) {
    if (confirm(`Xác nhận xóa ${item.name}`)) {
      const deletePromise = this.classService
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
