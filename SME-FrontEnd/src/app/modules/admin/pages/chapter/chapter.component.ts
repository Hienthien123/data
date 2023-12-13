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
  testAuth = {
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ4ODlmMTRmYzQzZjk3NGJhYjJjMzkiLCJyb2xlcyI6IlVTRVIsSU5TVFJVQ1RPUixBRE1JTiIsInVzZXJuYW1lIjoidGRpZGNkY2RkZCIsInByb2ZpbGUiOiJ7IG5hbWU6ICd0YTMnIH0iLCJlbWFpbCI6ImVtY2RpbEBlbWFpbC5jb20iLCJpYXQiOjE3MDIzMzkxOTAsImV4cCI6MTcwMjM5OTE5MH0.tjlbCEtQUGso2uM1sWqW3EGpBzEWoD36AUDrAzcJWwI'
  }
  courseId = {
    _id: '123',
    authorization: this.testAuth.authorization
  }
  ChapterId = {
    _id: '123',
    authorization: this.testAuth.authorization
  }

  constructor(private chapterService: ChapterService,private toastr:ToastrService,private route: ActivatedRoute,private router: Router){

  }
  ngOnInit(): void {
    const x = this.route.snapshot.paramMap.get('course_id');
    if(x!==null) 
    {
      this.loadData(x)
    }
  }
  loadData(x:string): void {
    this.courseId._id = x
    const xx = this.chapterService.getAll(this.courseId).subscribe(res => {
      if(res.isSuccess) {
        // this.courseId._id = x
        this.data = res.result.sort((a,b)=> a.order - b.order)
        this.toastr.info('Success loading')
        console.log(this.data)
      }
      else{
        this.toastr.error(res.message);
      }
    })
  }
  deleteItem(item:ChapterModel):void{
    const del = {
      _id: item._id,
      authorization: this.testAuth.authorization
    }
    if(confirm(`Xác nhận xóa ${item.title}`)){
      const deletePromise = this.chapterService.delete(del).subscribe(res => {
        if(res.isSuccess){
          this.toastr.info('Xóa thành công');
          const x = this.route.snapshot.paramMap.get('course_id');
          if(x!==null) 
          {
            this.loadData(x)
          }
        } else{
          this.toastr.error(res.message);
        }
      })
    }
  
  }
}
