import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/website/course.service';
@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.scss']
})
export class StudentCourseComponent {
  data : any
  constructor(private courseService: CourseService,private route: ActivatedRoute,private router: Router){
    const _id = this.route.snapshot.paramMap.get('_id')
    const course_id = this.route.snapshot.paramMap.get('course_id')
    let r = this.courseService.learn({authorization: localStorage.getItem('authorization'),_id: _id,course_id: course_id}).subscribe(res=>{
      if(res.isSuccess)
        this.data = res.result
    })
  }
}
