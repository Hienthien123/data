import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EducationalYearModel } from 'src/app/models/educationalYear.model';
import { EducationalYearService } from 'src/app/services/admin/educational-year.service';

@Component({
  selector: 'app-form-educational-year',
  templateUrl: './form-educational-year.component.html',
  styleUrls: ['./form-educational-year.component.scss']
})
export class FormEducationalYearComponent implements OnInit{

  breadCrumb = [
    {
      title: 'Năm học',
      path: '/admin/educationalYears'
    },
    {
      title: 'Thông tin năm học',
      path: '/admin/educationalYears/add'
    }
  ]

  data: EducationalYearModel = {
    id: 0,
    yearTitle: '',
    organizationId: undefined
  };

  itemId: string | undefined | null;
  constructor(private route: ActivatedRoute, private educationalYearService: EducationalYearService,  private router: Router) {}
  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
    if (this.itemId) {
      this.loadData(parseInt(this.itemId));
    }
  }

  loadData(id: number) {
    const getDataPromise = this.educationalYearService.getById(id).subscribe(response => {
      if(response.isSuccess){
        this.data = response.result as EducationalYearModel;
      }
    })
  }

  submit() {
    if (this.itemId) {
      // this.data.active = JSON.parse(this.data.active);
      const addDataPromise = this.educationalYearService.update(this.data).subscribe(response => {
        if(response.isSuccess) {
          this.router.navigate(['/admin/educationalYears'])
        }        
      })
    }else{
      // this.data.active = JSON.parse(this.data.active);
      const addDataPromise = this.educationalYearService.create(this.data).subscribe(response => {
        if(response.isSuccess){
          this.router.navigate(['/admin/educationalYears'])
        }
        else {
          console.log("Not response !!");
        }
      });
    }
  }

}
