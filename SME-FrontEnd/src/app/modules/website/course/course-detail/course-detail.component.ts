import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent {
  id :any
  constructor(private route: ActivatedRoute,private router: Router,){
    this.load_id()
  }
  load_id(){
    this.id = this.route.snapshot.paramMap.get('_id')
  } 
}
