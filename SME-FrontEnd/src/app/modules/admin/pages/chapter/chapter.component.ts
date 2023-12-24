import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChapterModel } from 'src/app/models/doan/chapterModel';
import { ChapterService } from 'src/app/services/admin/chapter.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent implements OnInit{
  data: ChapterModel[] = []
  p: any = 1
  course_id = '123'

  constructor(private chapterService: ChapterService,private toastr:ToastrService,private route: ActivatedRoute,private router: Router){

  }
  ngOnInit(): void {
    this.loadData()
  }
  loadData(): void {
    const x = this.route.snapshot.paramMap.get('course_id');
    
    if(x!==null){
      this.course_id = x
      const courseId ={
        _id: x,
        authorization: localStorage.getItem('authorization')
      }
    const xx = this.chapterService.getAll(courseId).subscribe(res => {
      if(res.isSuccess) {
        // this.courseId._id = x
        if(res.token)
          localStorage.setItem('authorization',res.token)
        
        this.data = res.result.sort((a,b)=> a.order - b.order)
        
        this.toastr.info('Success loading')
        
      }
      else{
        this.toastr.error(res.message);
      }
    })
    }
    
  }
  deleteItem(item:ChapterModel):void{
    const del = {
      _id: item._id,
      authorization: localStorage.getItem('authorization')
    }
    if(confirm(`Xác nhận xóa ${item.title}`)){
      const deletePromise = this.chapterService.delete(del).subscribe(res => {
        if(res.isSuccess){
          this.toastr.info('Xóa thành công');
          const x = this.route.snapshot.paramMap.get('course_id');
          if(x!==null) 
          {
            this.loadData()
          }
        } else{
          this.toastr.error(res.message)
        }
      })
    }
  
  }
}
