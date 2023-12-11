import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GradeModel } from 'src/app/models/grade.model';
import { GradeService } from 'src/app/services/admin/grade.service';

@Component({
  selector: 'app-form-grade',
  templateUrl: './form-grade.component.html',
  styleUrls: ['./form-grade.component.scss']
})
export class FormGradeComponent implements OnInit {
  gradeData : GradeModel[] = [];
  breadCrumb = [
    {
      title: 'Danh sách khối học',
      path: '/admin/grade'
    },
    {
      title: 'Thông tin khối học',
      path: ''
    }
  ]
  data: GradeModel = {id: 0, name: '',code:'',isSeniorGrade:false,organizationId:0,};
  itemId: string | null |undefined;

 
  constructor(private route: ActivatedRoute, private gradeService: GradeService, private Router: Router){
    
  }
  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id');
    if(this.itemId) this.loadData(parseInt(this.itemId));   
    
  }
  
  loadData(id: number){
    const getDataPromise = this.gradeService.getById(id).subscribe(res => {
      if(res.isSuccess){                
        this.data = res.result as GradeModel;        
       
      }
    })
  }
  
  submit() {
    if(this.itemId){
      
      const addDataPromise = this.gradeService.update(this.data).subscribe(res => {
        if(res.isSuccess){
          this.Router.navigate(['/admin/grade'])
         
        }
      })
    }else{
      const addDataPromise = this.gradeService.create(this.data).subscribe(res => {
        if(res.isSuccess){
          this.Router.navigate(['/admin/grade'])
  

        }
      })
    }
  }
}
