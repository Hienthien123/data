import { StudentModel } from './../../../../../models/student.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClassModel } from 'src/app/models/class.model';
import { PaginatingSetModel } from 'src/app/models/paginatingSet.model';
import { DatePipe } from '@angular/common';
import { StudentMapsClassModel } from 'src/app/models/studentMapsClass.model';
import { ClassServiceService } from 'src/app/services/admin/class-service.service';
import { StudentMapsClassService } from 'src/app/services/admin/student-maps-class.service';
import { StudentService } from 'src/app/services/admin/student.service';

@Component({
  selector: 'app-class-student-list',
  templateUrl: './class-student-list.component.html',
  styleUrls: ['./class-student-list.component.scss'],
})
export class ClassStudentListComponent implements OnInit {
  studenAddClass: StudentMapsClassModel[] = [];
  showModal = false;
  classdata: ClassModel[] = [];
  studentsNotInClass: StudentModel[] = [];
  studentsInClass: StudentModel[] = [];
  selectAll: boolean = false;
  studentMapsClass: StudentMapsClassModel[] = [];
  itemId: string | null | undefined;
  listModel: StudentModel[] = [];
  selectedStudentIds: number[] = [];
  noStudentsFound: boolean = false;
  breadCrumb = [
    {
      title: 'Danh sách Lớp',
      path: '/admin/class',
    },
    {
      title: 'Danh sách học viên đăng ký',
      path: '',
    },
  ];

  constructor(
    private studentService: StudentService,
    private studentMapsClassService: StudentMapsClassService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
    if (this.itemId) {
      this.loadDataModal(parseInt(this.itemId));
      this.loadData(parseInt(this.itemId));
    }

    // if (this.studentsInClass.length > 0) {
    //   this.noStudentsFound = false;
    // } else {
    //   this.noStudentsFound = true;
    // }
  }
  loadDataModal(id: number) {
    const getAllPromise = this.studentMapsClassService
      .getByIdFKClass(id)
      .subscribe((res) => {
        if (res.isSuccess) {
          // this.toastr.info('Tải dữ liệu thành công');
          this.studentMapsClass = res.result as StudentMapsClassModel[];
          const allStudent = this.studentService.getAll().subscribe((res) => {
            if (res.isSuccess) {
              this.listModel = res.result as StudentModel[];
              const studentIdsNotInClass = new Set<number>(
                this.studentMapsClass.map((studentMap) => studentMap.studentId)
              );
              this.studentsNotInClass = this.listModel.filter(
                (student) => !studentIdsNotInClass.has(student.id)
              );
              console.log(this.studentsInClass);
            }
          });
        }
      });
  }
  loadData(id: number) {
    const getAllPromise = this.studentMapsClassService
      .getByIdFKClass(id)
      .subscribe((res) => {
        if (res.isSuccess) {
          this.studentMapsClass = res.result as StudentMapsClassModel[];
          const allStudent = this.studentService.getAll().subscribe((res) => {
            if (res.isSuccess) {
              this.listModel = res.result as StudentModel[];
              
              const studentIdsInClass = new Set<number>(this.studentMapsClass.map(studentMap => studentMap.studentId));
              this.studentsInClass = this.listModel.filter(student => studentIdsInClass.has(student.id)); 
              console.log(this.studentsInClass);
            }
          });
        }
      });
  }
  //   filterStudentsInClass(classId: number) {
  //     const studentIdsInClass = new Set<number>(this.studentMapsClass.map(studentMap => studentMap.studentId));
  // this.studentsInClass = this.listModel.filter(student => studentIdsInClass.has(student.id));
  // console.log(this.studentsInClass);
  // }
  // getnam(id: number) {
  //   const classModel = this.studentsInClass.find((cls) => cls.id === id);

  //   return classModel?.emergencyContactName;
  // }

  deleteItem(student: StudentModel) {
    const studentMap = this.studentMapsClass.find(
      (mapping) => mapping.studentId === student.id
    );

    if (studentMap && confirm(`Xác nhận xóa ${student.fullName}`)) {
      const deletePromise = this.studentMapsClassService
        .delete(studentMap.id)
        .subscribe((res) => {
          if (res.isSuccess) {
            this.toastr.info('Xóa thành công');
            this.loadData(studentMap.classId);
            this.loadDataModal(studentMap.classId);
          } else {
            this.toastr.error(res.message);
          }
        });
    }
  }

  // checkAllCheckBox(ev: any) {
  // 	this.listModel.forEach(x => x.checked = ev.target.checked)
  // }
  selectAllChanged(event: any) {
    this.selectAll = event.target.checked;
  
    if (this.selectAll) {
      if (this.itemId) {
        const classId = parseInt(this.itemId);
        this.studenAddClass = this.studentsNotInClass.map(item => ({
          id: 0,
          studentId: item.id,
          classId: classId,
          behaviorScore: 0,
          averageTestScore: 0,
        }));
      } else {
        console.log('itemId is undefined');
      }
    } else {
      this.studenAddClass = [];
    }
  }
  
  checkboxChanged(e: any) {
    this.noStudentsFound = this.studenAddClass.length > 0;
    const studentId = parseInt(e.target.value);

    if (e.target.checked) {
      if (this.itemId) {
        const classId = parseInt(this.itemId);
        this.studenAddClass.push({
          id: 0,
          studentId: studentId,
          classId: classId,
          behaviorScore: 0,
          averageTestScore: 0,
        });
        console.log(this.studenAddClass);
      } else {
        console.log('itemId is undefined');
      }
    } else {
      this.studenAddClass = this.studenAddClass.filter(
        (item) => item.studentId !== studentId
      );
      console.log(this.studenAddClass);
    }
  }

  submit() {
    if ((this.noStudentsFound = this.studenAddClass.length > 0)) {
      const addDataPromise = this.studentMapsClassService
        .createMultiple(this.studenAddClass)
        .subscribe((res) => {
          if (res.isSuccess) {
            this.closeModal();
            this.toastr.success('Thêm thành công');
          }
          if (this.itemId) {
            this.loadData(parseInt(this.itemId));
            this.loadDataModal(parseInt(this.itemId));
          }
        });
    }
  }

  openModal() {
    this.showModal = !this.showModal;
  }
  closeModal() {
    this.showModal = false;
  }
}
