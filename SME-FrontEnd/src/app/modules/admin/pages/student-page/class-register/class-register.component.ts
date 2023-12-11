import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { StudentMapsClassService } from "../../../../../services/admin/student-maps-class.service";
import { StudentMapsClassModel } from "../../../../../models/studentMapsClass.model";
import { ClassServiceService } from "../../../../../services/admin/class-service.service";
import { ClassModel } from "../../../../../models/class.model";
import { GradeService } from "../../../../../services/admin/grade.service";
import { SubjectgroupServiceService } from "../../../../../services/admin/subjectgroup-service.service";
import { SubjectServiceService } from "../../../../../services/admin/subject-service.service";
import { GradeModel } from "../../../../../models/grade.model";
import { SubjectModel } from "../../../../../models/Subject.model";
import { SubjectGroupModel } from "../../../../../models/subjectGroup.model";


@Component({
  selector: 'app-class-register',
  templateUrl: './class-register.component.html',
  styleUrls: ['./class-register.component.scss']
})
export class ClassRegisterComponent implements OnInit {

  breadCrumb = [
    {
      title: 'Danh sách học viên',
      path: '/admin/students'
    },
    {
      title: 'Thông tin lớp học',
      path: ''
    }
  ]

  studenAddClass: StudentMapsClassModel[] = [];
  studentMapsClass: StudentMapsClassModel[] = [];
  allClass: ClassModel[] = [];
  classNoInTagetStudent: ClassModel[] = [];
  subjectMap: { [id: number]: string } = {};
  subjectgroupMap: { [id: number]: string } = {};
  gradeMap: { [id: number]: string } = {};
  itemId: string | null | undefined;
  selectedItemId: number | undefined;
  constructor(
    private studentMapsClassService: StudentMapsClassService,
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
    const getAllPromise = this.studentMapsClassService.GetByIdFKStudent(id).subscribe((res) => {
      if (res.isSuccess) {
        this.toastr.info('Tải dữ liệu thành công');
        this.studentMapsClass = res.result as StudentMapsClassModel[];
        const allClass = this.classService.getAll().subscribe(res => {
          if (res.isSuccess) {
            this.allClass = res.result as ClassModel[];

            this.classNoInTagetStudent = this.allClass.filter(c => {
              // Kiểm tra xem lớp học có tồn tại trong danh sách lớp đã tham gia không
              const classIdsJoined = this.studentMapsClass.map(smc => smc.classId);
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
        this.studenAddClass.push({ id: 0, studentId: itemIdAsNumber, classId: idClassAsNumber, behaviorScore: 0, averageTestScore: 0 });
        console.log(this.studenAddClass);
      } else {
        console.log("itemId is undefined");
      }
    } else {
      this.studenAddClass = this.studenAddClass.filter(item => item.classId !== idClassAsNumber)
      console.log(this.studenAddClass);

    }
  }

  submit() {
    console.log('a')
    const addDataPromise = this.studentMapsClassService.createMultiple(this.studenAddClass).subscribe(res => {
      if (res.isSuccess) {
        this.router.navigate([`admin/students/`]);
        this.toastr.success("Thêm thành công học sinh vào lớp")

      }
    })

  }
}
