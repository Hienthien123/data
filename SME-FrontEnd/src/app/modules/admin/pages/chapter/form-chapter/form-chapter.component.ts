import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChapterService } from 'src/app/services/admin/chapter.service';

@Component({
  selector: 'app-form-chapter',
  templateUrl: './form-chapter.component.html',
  styleUrls: ['./form-chapter.component.scss']
})
export class FormChapterComponent implements OnInit{
  breadCrumb = [
    {
      title: 'Chapter',
      path: ''
    },
    {
      title: 'Thông tin chapter',
      path: ''
    }
  ]
  testAuth = {
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ4ODlmMTRmYzQzZjk3NGJhYjJjMzkiLCJyb2xlcyI6IlVTRVIsSU5TVFJVQ1RPUixBRE1JTiIsInVzZXJuYW1lIjoidGRpZGNkY2RkZCIsInByb2ZpbGUiOiJ7IG5hbWU6ICd0YTMnIH0iLCJlbWFpbCI6ImVtY2RpbEBlbWFpbC5jb20iLCJpYXQiOjE3MDIzMzkxOTAsImV4cCI6MTcwMjM5OTE5MH0.tjlbCEtQUGso2uM1sWqW3EGpBzEWoD36AUDrAzcJWwI'
  }
  id = {
    _id: '123',
    authorization: this.testAuth.authorization
  }
  data = {
    _id:  '',
    title: '',
    course_id: '',
    order: 0,
  }
  course_id = ''
  constructor(private chapterService: ChapterService,private toastr:ToastrService,private route: ActivatedRoute,private router: Router){
  }
  ngOnInit(): void {
    const x = this.route.snapshot.paramMap.get('_id');
    console.log(x)
    if(x!==null) 
    {
      this.id._id = x
      this.loadData()
    }else{
      const xx = this.route.snapshot.paramMap.get('_idd')
      if(xx!==null)
      this.course_id = xx
      this.breadCrumb[0].path = '/admin/chapter/' + xx
    }
}
  loadData(){
    const getDataPromise = this.chapterService.getById(this.id).subscribe(res => {
      if(res.isSuccess){
        this.data = res.result
        const x = this.data.course_id
        this.breadCrumb[0].path = '/admin/chapter/' +  this.data.course_id
        this.course_id = x
        console.log(this.data)
      }
    })
  }

  submit(){
    var changed = {
      change: this.data,
      authorization: this.testAuth.authorization
    }
    if(this.route.snapshot.paramMap.get('_id')){
      const addDataPromise = this.chapterService.update(changed).subscribe(res => {
        if(res.isSuccess){
          this.router.navigate(['/admin/chapter',this.data.course_id])
        }
      })
      console.log(changed)
    }else{
      const xx = this.route.snapshot.paramMap.get('_idd')
      if(xx!==null)
      changed.change.course_id = xx
      console.log(changed)
      const addDataPromise = this.chapterService.create(changed).subscribe(res => {
        console.log(addDataPromise);
        if(res.isSuccess){
          this.router.navigate(['/admin/chapter',xx])
        }
      })
    }
  }
}
