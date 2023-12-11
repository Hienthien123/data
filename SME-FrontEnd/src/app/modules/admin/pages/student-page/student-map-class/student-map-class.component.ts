import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassModel } from 'src/app/models/class.model';
import { PaginatingSetModel } from 'src/app/models/paginatingSet.model';
import { StudentModel } from 'src/app/models/student.model';
import { StudentMapsClassModel } from 'src/app/models/studentMapsClass.model';
import { StudentMapsTuition } from 'src/app/models/studentMapsTuition';
import { TuitionModel } from 'src/app/models/tuition.model';
import { ClassServiceService } from 'src/app/services/admin/class-service.service';
import { StudentMapTuitionService } from 'src/app/services/admin/student-map-tuition.service';
import { StudentMapsClassService } from 'src/app/services/admin/student-maps-class.service';
import { StudentService } from 'src/app/services/admin/student.service';
import { TuitionService } from 'src/app/services/admin/tuition.service';

@Component({
  selector: 'app-student-map-class',
  templateUrl: './student-map-class.component.html',
  styleUrls: ['./student-map-class.component.scss']
})
export class StudentMapClassComponent {
  studentMaps: StudentMapsTuition[] = [];
  studentMapsClassStudentid: { [studentId: number]: number } = {};
  studentMapsClassid: { [classId: number]: number } = {};
  studentMapsTuition: { [tuitionId: number]: number } = {};
  studentName: { [id: number]: string } = {};
  studentTuitionDate: { [id: string]: string } = {};
  studentClassName: { [id: number]: string } = {};
  classNameFilter: string = '';
  filteredStudentMapsClass: any[] = [];
  listModel: PaginatingSetModel<StudentModel> = {
    page: 1,
    totalCount: 0,
    totalPage: 0,
    items: [],
    count: 0
  };
  itemId: string | null | undefined;


  ngOnInit(): void {
   // this.loadMapClassStudent();
   this.itemId = this.route.snapshot.paramMap.get('id');
    if (this.itemId) this.loadMapClassStudentId(parseInt(this.itemId));
    this.loadStudentNames();
    this.loadStudentClassName();
    this.loadStudentTuitionName();
  }

  constructor(
    private studentMapsTuitionService: StudentMapTuitionService,
    private studentService: StudentService,
    private classService: ClassServiceService,
    private tuitionSerive: TuitionService,
    private router: Router,
    private route: ActivatedRoute,
  ) { this.filteredStudentMapsClass = this.studentMaps; }

  // loadMapClassStudent() {
  //   this.studentMapsTuitionService.getAll().subscribe((res) => {
  //     if (res.isSuccess) {
  //       const student: StudentMapsTuition[] = res.result as StudentMapsTuition[];
  //       student.forEach((st) => {
  //         this.studentMapsClassStudentid[st.id] = st.studentId;
  //         this.studentMapsClassid[st.id] = st.classId;
  //       });
  //       this.studentMaps = student;
  //     }
  //     console.log(this.studentMaps)
  //   });
  // }

  
  loadMapClassStudentId(ClassId: number) {
    this.studentMapsTuitionService.getByClassId(ClassId).subscribe((res) => {
      if (res.isSuccess) {
        const student: StudentMapsTuition[] = res.result as StudentMapsTuition[];
        student.forEach((st) => {
          this.studentMapsClassStudentid[st.id] = st.studentId;
          this.studentMapsClassid[st.id] = st.classId;
        });
        this.studentMaps = student;
      }
      console.log(this.studentMaps)
    });
  }
  

  loadStudentNames() {
    this.studentService.getAll().subscribe((res) => {
      if (res.isSuccess) {
        const studentName: StudentModel[] = res.result as StudentModel[];
        studentName.forEach((stn) => {
          this.studentName[stn.id] = stn.fullName;
        });
      }
    });
  }




  getStudentTuitionDate(id: number): string {
    if (this.studentTuitionDate[id]) {
      return this.studentTuitionDate[id];
    } else {
      return ''; 
    }
  }


  loadStudentClassName() {
    this.classService.getAll().subscribe((res) => {
      if (res.isSuccess) {
        const className: ClassModel[] = res.result as ClassModel[];
        className.forEach((stnl) => {
          this.studentClassName[stnl.id] = stnl.name;
        });
      }
    });
  }
  loadStudentTuitionName() {
    this.tuitionSerive.getAll().subscribe((res) => {
      if (res.isSuccess) {
        const tuitionName: TuitionModel[] = res.result as TuitionModel[];
        tuitionName.forEach((stnl) => {
          this.studentMapsTuition[stnl.id] = stnl.amountOfMoney;
        });
      }
    });
  }
  filterByClassName(className: string) {
    if (className) {
      this.filteredStudentMapsClass = this.studentMaps.filter(item =>
        this.studentClassName[item.classId].toLowerCase().includes(className.toLowerCase())
      );
    } else {
      this.filteredStudentMapsClass = this.studentMaps;
    }
  }
}