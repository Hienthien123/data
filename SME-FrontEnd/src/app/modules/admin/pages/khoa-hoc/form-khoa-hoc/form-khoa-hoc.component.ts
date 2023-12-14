import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseModel } from 'src/app/models/doan/courseModel';
import { KhoaHocService } from 'src/app/services/admin/khoa-hoc.service';

@Component({
  selector: 'app-form-khoa-hoc',
  templateUrl: './form-khoa-hoc.component.html',
  styleUrls: ['./form-khoa-hoc.component.scss']
})
export class FormKhoaHocComponent implements OnInit{
  breadCrumb = [
    {
      title: 'Khóa học',
      path: '/admin/khoa-hoc'
    },
    {
      title: 'Thông tin khóa học',
      path: ''
    }
  ]
  
  data: CourseModel = {
    _id: '',
    title: '',
    description: '',
    price: 0,
    categories: [],
    tags: [],
    chapters: [],
    reviews: [],
    payments: [],
    isDelete: false,
    author_id: '',
    createdAt: '',
    updatedAt: '',
    __v: 1,
  }

  constructor(private KhoaHocService_: KhoaHocService,private route: ActivatedRoute,private router: Router) { }
  ngOnInit(): void {
    this.loadData()

  }
  
  loadData(){
    const x = this.route.snapshot.paramMap.get('_id');
    if(x!=null){
      const id = {
        _id : x,
        authorization : localStorage.getItem('authorization'),
      }
      const getDataPromise = this.KhoaHocService_.getById(id).subscribe(res => {
        if(res.isSuccess){
          this.data = res.result as CourseModel
          console.log(this.data)
          localStorage.setItem('authorization',res.token)
        }
      })
    }
    
  }

  submit(){
    // console.log(2)
    const changed = {
      change: this.data,
      authorization: localStorage.getItem('authorization')
    }
    // this.changed.change = this.data
    if(this.route.snapshot.paramMap.get('_id')){
      const addDataPromise = this.KhoaHocService_.update(changed).subscribe(res => {
        if(res.isSuccess){
          this.router.navigate(['/admin/khoa-hoc'])
        }
      })
    }else{
      const addDataPromise = this.KhoaHocService_.create(changed).subscribe(res => {
        console.log(addDataPromise);
        if(res.isSuccess){
          this.router.navigate(['/admin/khoa-hoc'])
        }
      })
    }
  }

}
