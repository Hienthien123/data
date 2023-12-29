import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LessonModel } from 'src/app/models/doan/lessonModel';
import { LessonService } from 'src/app/services/admin/lesson.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit{
  data: LessonModel[] = []
  course_id = ''
  chapter_id = ''
  p: any = 1
  constructor(private lessonService: LessonService,private toastr:ToastrService,private route: ActivatedRoute,private router: Router){

  }
  ngOnInit(): void {
    this.loadData()
  }
  loadData(): void {
    const ch_id = this.route.snapshot.paramMap.get('chapter_id');
    const co_id = this.route.snapshot.paramMap.get('course_id')
    if(ch_id!==null&&co_id!==null){
      this.chapter_id = ch_id
      this.course_id = co_id
      const chapter_id ={
        _id: ch_id,
        authorization: localStorage.getItem('authorization')
      }
    const re = this.lessonService.getAll(chapter_id).subscribe(res => {
      if(res.isSuccess) {
        this.data = res.result.sort((a,b)=> a.order - b.order)
        this.toastr.info('Success loading')
        // console.log(this.data)
        if(res.token)
localStorage.setItem('authorization',res.token)
        // console.log(res)
      }
      else{
        this.toastr.error(res.message);
      }
    })
    }
    
  }
  deleteItem(item: LessonModel){
    const del = {
      _id : item._id,
      authorization: localStorage.getItem('authorization')
    }
    if(confirm(`Xác nhận xóa ${item.title}`)){
      const deletePromise = this.lessonService.delete(del).subscribe(res => {
        if(res.isSuccess){
          this.toastr.info('Xóa thành công');
          this.loadData();
        } else{
          this.toastr.error(res.message);
        }
      })
    }
  }

  protected readonly parseInt = parseInt;

}
