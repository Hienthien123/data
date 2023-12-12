import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GradeModel } from 'src/app/models/grade.model';
import { GradeService } from 'src/app/services/admin/grade.service';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent implements OnInit {
  
  gradeData: GradeModel[] = [];
  breadCrumb = [
    {
      title: 'Danh sách khối học',
      path: '/admin/grade'
    },    
  ]


  constructor(private gradeservice: GradeService, private toastr: ToastrService) {        
  }
  ngOnInit(): void {
      this.loadData()
  }
  getSeniorGradeName(isSeniorGrade: boolean): string {
    return isSeniorGrade ? 'Khối cuối cấp' : '';
  }
  loadData(){
    const getAllPromise = this.gradeservice.getAll().subscribe(res => {
      if(res.isSuccess){
        this.toastr.info('Tải dữ liệu thành công');
        this.gradeData = res.result as GradeModel[];
        console.log(this.gradeData);
      }else{
        this.toastr.error(res.message);
      }
    })
  }
  
  deleteItem(item: GradeModel){
    if(confirm(`Xác nhận xóa ${item.name}`)){
      const deletePromise = this.gradeservice.delete(item.id).subscribe(res => {
        if(res.isSuccess){
          this.toastr.info('Xóa thành công');
          this.loadData();
        } else{
          this.toastr.error(res.message);
        }
      })
    }
  }
}
