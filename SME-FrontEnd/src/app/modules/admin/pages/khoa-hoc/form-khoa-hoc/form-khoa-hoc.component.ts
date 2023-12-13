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
  testAuth = {
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ4ODlmMTRmYzQzZjk3NGJhYjJjMzkiLCJyb2xlcyI6IlVTRVIsSU5TVFJVQ1RPUixBRE1JTiIsInVzZXJuYW1lIjoidGRpZGNkY2RkZCIsInByb2ZpbGUiOiJ7IG5hbWU6ICd0YTMnIH0iLCJlbWFpbCI6ImVtY2RpbEBlbWFpbC5jb20iLCJpYXQiOjE3MDIzMzkxOTAsImV4cCI6MTcwMjM5OTE5MH0.tjlbCEtQUGso2uM1sWqW3EGpBzEWoD36AUDrAzcJWwI'
  }
  id = {
    _id: '123',
    authorization: this.testAuth.authorization
  }
  changed={
    change: this.data,
    authorization: this.testAuth.authorization
  }
  constructor(private KhoaHocService_: KhoaHocService,private route: ActivatedRoute,private router: Router) { }
  ngOnInit(): void {
    const x = this.route.snapshot.paramMap.get('_id');
    if(x!==null) 
    {
      this.id._id = x
      this.loadData()
    }
  }
  
  loadData(){
    const getDataPromise = this.KhoaHocService_.getById(this.id).subscribe(res => {
      if(res.isSuccess){
        this.data = res.result as CourseModel
        console.log(this.data)
      }
    })
  }

  submit(){
    // console.log(2)
    this.changed.change = this.data
    if(this.route.snapshot.paramMap.get('_id')){
      const addDataPromise = this.KhoaHocService_.update(this.changed).subscribe(res => {
        if(res.isSuccess){
          this.router.navigate(['/admin/khoa-hoc'])
        }
      })
    }else{
      const addDataPromise = this.KhoaHocService_.create(this.changed).subscribe(res => {
        console.log(addDataPromise);
        if(res.isSuccess){
          this.router.navigate(['/admin/khoa-hoc'])
        }
      })
    }
  }

}
