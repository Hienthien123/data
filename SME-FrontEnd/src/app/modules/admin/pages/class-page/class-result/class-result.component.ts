import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaginatingSetModel } from 'src/app/models/paginatingSet.model';
import { StudentModel } from 'src/app/models/student.model';
import { TestScoreModel } from 'src/app/models/testScore.model';
import { StudentService } from 'src/app/services/admin/student.service';
import { TestScoreService } from 'src/app/services/admin/test-score.service';

@Component({
  selector: 'app-class-result',
  templateUrl: './class-result.component.html',
  styleUrls: ['./class-result.component.scss']
})
export class ClassResultComponent implements OnInit {
  breadCrumb = [
    {
      title: 'Danh sách lớp',
      path: '/admin/class',
    },
    {
      title: 'Thông tin điểm',
      path: '',
    }
  ];
  studentMapName: {[id: number]: string} = {};

  listStudentModel: PaginatingSetModel<StudentModel> = {
    page: 1,
    totalCount: 0,
    totalPage: 0,
    items: [],
    count: 0 
  };
  TestScoreData: TestScoreModel[] = [];
  itemId: string | null | undefined;
  payload: TestScoreModel = {
    id: 0,
    studentId: 0,
    classId: 0,
    testScore: '',
    isNumber: false,
    weight1: 0,
    weight2: 0,
    weight3: 0,
    weight4: 0,
  }

  constructor(private studentService: StudentService,
     private route: ActivatedRoute,
      private http: HttpClient,
       private testScoreService: TestScoreService,
        private toastr: ToastrService) {}
  
  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
    if (this.itemId) this.getStudentById(parseInt(this.itemId));
    this.loadStudentName();
    
  }

  getByClassId(classId: number) {
    const getDataPromise = this.testScoreService.getByClassId(classId).subscribe(res => {
      if (res.isSuccess) {
        this.toastr.info("Tải thông tin thành công");
        this.TestScoreData = res.result as TestScoreModel[];
        console.log(this.TestScoreData);
      }
    });
  }

  loadStudentName() {
     const loadDataName = this.studentService.getStudents().subscribe(res => {
      if (res.isSuccess) {
        const students = res.result as PaginatingSetModel<StudentModel>;
        students.items.forEach(st => {
          this.studentMapName[st.id] = st.fullName;
        });
      }
     });
  }

  submit(studentId: number, classId: number) {
    
  }

  getStudentById(classId: number) {
    this.studentService.getStudents().subscribe(res => {
      if (res.isSuccess) {
        this.listStudentModel = res.result as PaginatingSetModel<StudentModel>;
        
        const getDataPromise = this.testScoreService.getByClassId(classId).subscribe(res => {
          if (res.isSuccess) {
            this.toastr.info("Tải thông tin thành công");
            this.TestScoreData = res.result as TestScoreModel[];
            console.log(this.TestScoreData);
            
            for (let i = 0; i < this.listStudentModel.items.length; i++) {
              for (let j = 0; j < this.TestScoreData.length; j++) {
                if (this.listStudentModel.items[i].id == this.TestScoreData[j].studentId) {
                  this.TestScoreData[j].student = this.listStudentModel.items[i];
                  console.log(this.TestScoreData[j]);
                }
                
              }
              
            }
          }
        });
        

      }
    });
    
  }
}
