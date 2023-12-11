import { Component, OnInit } from '@angular/core';
import { ClassModel } from 'src/app/models/class.model';
import { employeeMapsClassModel } from 'src/app/models/employeeMapsClass.model';
import { EmployeeMapService } from 'src/app/services/admin/employee-maps-class.service';
import { ActivatedRoute, Router } from "@angular/router";
import { ClassServiceService } from 'src/app/services/admin/class-service.service';
import { GradeComponent } from '../../grade/grade.component';
import { SubjectgroupServiceService } from 'src/app/services/admin/subjectgroup-service.service';
import { SubjectServiceService } from 'src/app/services/admin/subject-service.service';
import { ToastrService } from 'ngx-toastr';
import { SubjectModel } from 'src/app/models/Subject.model';
import { GradeModel } from 'src/app/models/grade.model';
import { SubjectGroupModel } from 'src/app/models/subjectGroup.model';
import { GradeService } from 'src/app/services/admin/grade.service';


@Component({
  selector: 'app-class-assign',
  templateUrl: './class-assign.component.html',
  styleUrls: ['./class-assign.component.scss']
})
export class ClassAssignComponent implements OnInit {
  breadCrumb = [
    {
      title: 'Danh sách giảng viên',
      path: '/admin/employees'
    },
    {
      title: 'Thông tin giảng viên',
      path: ''
    }
  ]
  emloyeesAddClass: employeeMapsClassModel[] = [];
  emloyeesMapsClass: employeeMapsClassModel[] = [];
  allClass: ClassModel[] = [];
  classNoInTagetStudent: ClassModel[] = [];
  subjectMap: { [id: number]: string } = {};
  subjectgroupMap: { [id: number]: string } = {};
  gradeMap: { [id: number]: string } = {};
  itemId: string | null | undefined;
  selectedItemId: number | undefined;
  constructor(
    private employeeMapsClassService: EmployeeMapService,
    private route: ActivatedRoute,
    private classService: ClassServiceService,
    private gradeservice: GradeService,
    private sgroupsService: SubjectgroupServiceService,
    private subjectService: SubjectServiceService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
    if (this.itemId) this.loadData(parseInt(this.itemId));
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

  loadData(id: number) {
    const getAllPromise = this.employeeMapsClassService.GetInfoByIdFkEmployeeId(id).subscribe((res) => {
      if (res.isSuccess) {
        this.toastr.info('Tải dữ liệu thành công');
        this.emloyeesMapsClass = res.result as employeeMapsClassModel[];
        const allClass = this.classService.getAll().subscribe(res => {
          if (res.isSuccess) {
            this.allClass = res.result as ClassModel[];

            this.classNoInTagetStudent = this.allClass.filter(c => {
              const classIdsJoined = this.emloyeesMapsClass.map(smc => smc.classId);
              return !classIdsJoined.includes(c.id);
            });

            console.log(this.classNoInTagetStudent)
          }
        })

      }
    });
  }

  checkboxChanged(e: any) {
    const idClassAsNumber = parseInt(e.target.value);

    if (e.target.checked) {
      if (this.itemId) {
        const itemIdAsNumber = parseInt(this.itemId);
        this.emloyeesAddClass.push({ id: 0, employeeId: itemIdAsNumber, classId: idClassAsNumber });
        console.log(this.emloyeesAddClass);
      } else {
        console.log("itemId is undefined");
      }
    } else {
      this.emloyeesAddClass = this.emloyeesAddClass.filter(item => item.classId !== idClassAsNumber)
      console.log(this.emloyeesAddClass);

    }
  }
  submit() {
    console.log('a')
    const addDataPromise = this.employeeMapsClassService.createMultiple(this.emloyeesAddClass).subscribe(res => {
      if (res.isSuccess) {
        this.router.navigate([`admin/employees/`]);
        this.toastr.success("Thêm thành công nhân viên vào lớp")

      }
    })
  }
} 


