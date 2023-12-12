import { Component, OnInit } from '@angular/core';
import { PaginatingSetModel } from 'src/app/models/paginatingSet.model';
import { StudentModel } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/admin/student.service';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.scss']
})
export class StudentPageComponent implements OnInit {
  breadCrumb = [
    {
      title: 'Danh sách học viên',
      path: '/admin/students'
    },    
  ]
  listModel: PaginatingSetModel<StudentModel> = {
    page: 1,
    totalCount: 0,
    totalPage: 0,
    items: [],
    count: 0 
  };
  constructor(private studentService: StudentService){}
  ngOnInit(): void {
      this.loadData();
  }

  loadData(){
    this.studentService.getStudents().subscribe(res => {
        if(res.isSuccess){
          this.listModel = res.result as PaginatingSetModel<StudentModel>
          console.log(this.listModel);          
        }
        else{
          console.log(res.message);          
        }
      })
  }

  deleteItem(id?: number){
    if(id && confirm('Xác nhận xóa thông tin này')){
      this.studentService.deleteStudent(id).subscribe(res => {
        if(res.isSuccess){
          this.loadData();
        }
      })
    }
  }
}
