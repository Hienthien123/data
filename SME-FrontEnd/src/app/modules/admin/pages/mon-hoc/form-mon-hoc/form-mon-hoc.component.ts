import {Component, OnInit} from '@angular/core';
import {TestModel} from "../../../../../models/test.model";
import {ActivatedRoute, Router} from "@angular/router";
import {TestServiceService} from "../../../../../services/admin/test-service.service";
import {SubjectModel} from "../../../../../models/Subject.model";
import {SubjectServiceService} from "../../../../../services/admin/subject-service.service";
import {OrganizationService} from "../../../../../services/admin/organization.service";
import {OrganizationModel} from "../../../../../models/organization.model";
import {GradeService} from "../../../../../services/admin/grade.service";
import {GradeModel} from "../../../../../models/grade.model";
import {SubjectgroupServiceService} from "../../../../../services/admin/subjectgroup-service.service";
import {SubjectGroupModel} from "../../../../../models/subjectGroup.model";


@Component({
  selector: 'app-form-mon-hoc',
  templateUrl: './form-mon-hoc.component.html',
  styleUrls: ['./form-mon-hoc.component.scss']
})
export class FormMonHocComponent implements OnInit{
  breadCrumb = [
    {
      title: 'Môn học',
      path: '/admin/mon-hoc'
    },
    {
      title: 'Thông tin môn học',
      path: ''
    }
  ]
  dataOrganization:OrganizationModel[] = [];
  dataSubjectGroup:SubjectGroupModel[] = [];

  data: SubjectModel = {id: 0, subjectName: '',subjectCode : '',orderId: 0,subjectGroupId: 0 ,organizationId : 0};
  itemId: string | null |undefined;
  constructor(private SubjectgroupService:SubjectgroupServiceService,private OrganizationService:OrganizationService,private route: ActivatedRoute, private SubjectService: SubjectServiceService, private router: Router){

  }
  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id');
    if(this.itemId) this.loadData(parseInt(this.itemId));
    this.getAllOrganization();
    this.getAllSubjectGroup();
  }



  getAllSubjectGroup(){
      const getAllPromise = this.SubjectgroupService.getAll().subscribe(res =>{
          if (res.isSuccess){
              this.dataSubjectGroup = res.result as SubjectGroupModel[];
          }
          
      })
  }
  getAllOrganization(){
      const getAllPromise = this.OrganizationService.getAll().subscribe(res =>{
          if (res.isSuccess){
              this.dataOrganization = res.result as OrganizationModel[];
          }

      })
  }
  loadData(id: number){
    const getDataPromise = this.SubjectService.getById(id).subscribe(res => {
      if(res.isSuccess){
        this.data = res.result as SubjectModel;
      } 
    })
  }

    submit() {
      console.log(this.data)
        if(this.itemId){
            const addDataPromise = this.SubjectService.update(this.data).subscribe(res => {
                if(res.isSuccess){
                    this.router.navigate(['/admin/mon-hoc'])
                }
            })
        }else{
            const addDataPromise = this.SubjectService.create(this.data).subscribe(res => {
                console.log(addDataPromise);
                if(res.isSuccess){
                    this.router.navigate(['/admin/mon-hoc'])
                }
            })
        }
    }


}
