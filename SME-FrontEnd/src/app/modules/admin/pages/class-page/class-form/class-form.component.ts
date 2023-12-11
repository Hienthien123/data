
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassModel } from 'src/app/models/class.model';
import { GradeModel } from 'src/app/models/grade.model';
import { ClassServiceService } from 'src/app/services/admin/class-service.service';
import { GradeService } from 'src/app/services/admin/grade.service';
import { ToastrService } from 'ngx-toastr';
import { SubjectGroupModel } from 'src/app/models/subjectGroup.model';
import { SubjectModel } from 'src/app/models/subject.model';
import { SubjectgroupServiceService } from 'src/app/services/admin/subjectgroup-service.service';
import { SubjectServiceService } from 'src/app/services/admin/subject-service.service';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.scss'],
})
export class ClassFormComponent implements OnInit {
  classData: ClassModel[] = [];
  gradeData: GradeModel[] = [];
  subjectgroupData: SubjectGroupModel[] = [];
  subjectData: SubjectModel[] = [];
  breadCrumb = [
    {
      title: 'Danh sách Lớp',
      path: '/admin/class',
    },
    {
      title: 'Thông tin lớp',
      path: '',
    },
  ];
  data: ClassModel = {
    id: 0,
    name: '',
    code: '',
    organizationId: 0,
    classSize: 0,
    credits: 0,
    gradeId: 0,
    subjectId: 0,
    subjectGroupId: 0,
  };

  itemId: string | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private gradeservice: GradeService,
    private toastr: ToastrService,
    private classService: ClassServiceService,
    private sgroupsService: SubjectgroupServiceService,
    private subjectService: SubjectServiceService,
    private Router: Router
  ) {}
  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id');
    if (this.itemId) this.loadData(parseInt(this.itemId));
    this.loadtengrade();
    this.loadtensubjectgroup();
    this.loadtensubject();
  }
  loadtengrade() {
    const getAllPromise = this.gradeservice.getAll().subscribe((res) => {
      if (res.isSuccess) {
        this.gradeData = res.result as GradeModel[];
      } else {
        this.toastr.error(res.message);
      }
    });
  }
  loadtensubjectgroup() {
    const getAllPromise = this.sgroupsService.getAll().subscribe((res) => {
      if (res.isSuccess) {
        this.subjectgroupData = res.result as SubjectGroupModel[];
      } else {
        this.toastr.error(res.message);
      }
    });
  }
  loadtensubject() {
    const getAllPromise = this.subjectService.getAll().subscribe((res) => {
      if (res.isSuccess) {
        this.subjectData = res.result as SubjectModel[];
      } else {
        this.toastr.error(res.message);
      }
    });
  }
  loadData(id: number) {
    const getDataPromise = this.classService.getById(id).subscribe((res) => {
      if (res.isSuccess) {
        this.data = res.result as ClassModel;
      }
    });
  }

  submit() {
    if (this.itemId) {
      const addDataPromise = this.classService
        .update(this.data)
        .subscribe((res) => {
          if (res.isSuccess) {
            this.Router.navigate(['/admin/class']);
          }
        });
    } else {
      const addDataPromise = this.classService
        .create(this.data)
        .subscribe((res) => {
          if (res.isSuccess) {
            this.Router.navigate(['/admin/class']);
          }
        });
    }
  }
}
