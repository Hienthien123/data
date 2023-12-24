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
    this.loadData()
}
  loadData(){
    const x = this.route.snapshot.paramMap.get('_id')
    if(x!==null){
      const id = {
        _id: x,
        authorization: localStorage.getItem('authorization'),
      }
      const getDataPromise = this.chapterService.getById(id).subscribe(res => {
      if(res.isSuccess){
        this.data = res.result
        console.log(this.data)
        if(res.token)
localStorage.setItem('authorization',res.token)
      }
    })
    }
    const xx = this.route.snapshot.paramMap.get('course_id')
    if(xx!==null)
    this.course_id = xx
    this.breadCrumb[0].path = '/admin/chapter/' + xx
  }

  submit(){
    var changed = {
      change: this.data,
      authorization: localStorage.getItem('authorization')
    }
    console.log(changed)
    const xx = this.route.snapshot.paramMap.get('course_id')
      if(xx!==null){
        changed.change.course_id = xx
        if(this.route.snapshot.paramMap.get('_id')){
          const addDataPromise = this.chapterService.update(changed).subscribe(res => {
            if(res.isSuccess){
              this.router.navigate(['/admin/chapter',xx])
            }
          })
          
        }else{

          const addDataPromise = this.chapterService.create(changed).subscribe(res => {
            if(res.isSuccess){
              this.router.navigate(['/admin/chapter',xx])
            }
          })
        }
      }
  }
}
