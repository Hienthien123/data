import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LessonService } from 'src/app/services/admin/lesson.service';

@Component({
  selector: 'app-form-lesson',
  templateUrl: './form-lesson.component.html',
  styleUrls: ['./form-lesson.component.scss']
})
export class FormLessonComponent implements OnInit {
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
    chapter_id: '',
    link: '',
    order: 0,
  }
  course_id = ''
  chapter_id = ''

  constructor(private lessonService: LessonService,private toastr:ToastrService,private route: ActivatedRoute,private router: Router){
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
      const getDataPromise = this.lessonService.getById(id).subscribe(res => {
      if(res.isSuccess){
        this.data = res.result
        console.log(this.data)
        if(res.token)
localStorage.setItem('authorization',res.token)
      }
    })
    }
    const co_id = this.route.snapshot.paramMap.get('course_id')
    if(co_id!==null)
    this.course_id = co_id
    
    
    const ch_id = this.route.snapshot.paramMap.get('chapter_id')
    if(ch_id!==null)
    this.chapter_id = ch_id
    this.breadCrumb[0].path = '/admin/lesson/' + co_id+'/'+ch_id
  }

  submit(){
    var changed = {
      change: this.data,
      authorization: localStorage.getItem('authorization')
    }
    console.log(changed)
    const co_id = this.route.snapshot.paramMap.get('course_id')
    const ch_id = this.route.snapshot.paramMap.get('chapter_id')
    if(ch_id!==null&&co_id!==null){
      changed.change.chapter_id = ch_id
      if(this.route.snapshot.paramMap.get('_id')){
        const addDataPromise = this.lessonService.update(changed).subscribe(res => {
          if(res.isSuccess){
            this.router.navigate(['/admin/lesson',co_id,ch_id])
          }
        })
        
      }else{

        const addDataPromise = this.lessonService.create(changed).subscribe(res => {
          if(res.isSuccess){
            this.router.navigate(['/admin/lesson',co_id,ch_id])
          }
        })
      }
    }
  }

}
