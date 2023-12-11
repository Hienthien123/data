import {Component, OnInit} from '@angular/core';
import {OrganizationModel} from "../../../../../models/organization.model";
import {ActivatedRoute, Router} from "@angular/router";
import {OrganizationService} from "../../../../../services/admin/organization.service";

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})
export class OrganizationFormComponent implements OnInit{
  breadCrumb = [
    {
      title: 'Tổ chức',
      path: '/admin/organization'
    },
    {
      title: 'Thông tin tổ chức',
      path: ''
    }
  ]
  data: OrganizationModel = {id: 0, organizationName: '',parentOrganizationId : 0 };
  itemId: string | null |undefined;
  testData:OrganizationModel[] =[];
  organizationMap: { [id: number]: string } = {};

  constructor(private route: ActivatedRoute, private OrganizationService: OrganizationService, private router: Router){

  }
  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
    if(this.itemId) this.loadData(parseInt(this.itemId));
      this.getAllOrganization();
  }

  loadData(id: number){
    const getDataPromise = this.OrganizationService.getById(id).subscribe(res => {
      if(res.isSuccess){
        this.data = res.result as OrganizationModel;
      }
    })
  }
  submit() {
    console.log(this.data)
    if(this.itemId){
      const addDataPromise = this.OrganizationService.update(this.data).subscribe(res => {
        if(res.isSuccess){
          this.router.navigate(['/admin/organization'])
        }
      })
    }else{
      const addDataPromise = this.OrganizationService.create(this.data).subscribe(res => {
        console.log(addDataPromise);
        if(res.isSuccess){
          this.router.navigate(['/admin/organization'])
        }
      })
    }
  }


  checkFormValid(){
    var checking = this.data.organizationName == ''||
      this.data.parentOrganizationId == 0
    return checking;
  }

    getAllOrganization(){
        const getAllPromise = this.OrganizationService.getAll().subscribe(res =>{
            if(res.isSuccess){
                this.testData = res.result as OrganizationModel[];
            }
        })
  }

}
