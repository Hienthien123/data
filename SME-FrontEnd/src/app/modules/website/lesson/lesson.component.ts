import { Component ,Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/website/course.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit{
  @Input() course_id: any
  @Input() id: any
  lesson_data: any
  constructor(private courseService: CourseService,private route: ActivatedRoute,private router: Router,){
    
  }
  ngOnInit(): void {
    let k = this.courseService.getLesson({authorization: localStorage.getItem('authorization'),_id: this.id}).subscribe(res=>{
      console.log(res)
      if(res.isSuccess)
      this.lesson_data= res.result
    })
  }

  
}
