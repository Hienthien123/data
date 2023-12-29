import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestScoreService } from 'src/app/services/admin/test-score.service';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {

  constructor(private authService: TestScoreService, private route: ActivatedRoute,private router: Router){}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    const data ={
      code : code
    }
    console.log(code)
    const active = this.authService.activeUser(data).subscribe(res =>{
      if(res.isSuccess){
        console.log(res.message)
        this.router.navigate(['/auth'])
      }
    })
  }
  
}
