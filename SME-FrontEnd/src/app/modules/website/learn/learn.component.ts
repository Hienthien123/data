import { Component,Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/website/course.service';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit{
  @Input() id: any; 
  data : any
  
  constructor(private courseService: CourseService,private route: ActivatedRoute,private router: Router,){
    
  }
  ngOnInit(): void {
     this.courseService.getchapter({_id: this.id}).subscribe(res=>{
      if(res.isSuccess)
      this.data = res.result
      
      
    })
   

    
  }
}
