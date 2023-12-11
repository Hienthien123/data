import {Component, OnInit} from '@angular/core';
import {SubjectServiceService} from "../../../../services/admin/subject-service.service";
import {ToastrService} from "ngx-toastr";
import {OrganizationService} from "../../../../services/admin/organization.service";
import {OrganizationModel} from "../../../../models/organization.model";
import {SubjectGroupModel} from "../../../../models/subjectGroup.model";
import {SubjectgroupServiceService} from "../../../../services/admin/subjectgroup-service.service";
import { SubjectModel } from 'src/app/models/Subject.model';


@Component({
  selector: 'app-mon-hoc',
  templateUrl: './mon-hoc.component.html',
  styleUrls: ['./mon-hoc.component.scss']
})
export class MonHocComponent implements OnInit{
  testData : SubjectModel[] = [];
  subjectgroupMap: { [id: number]: string } = {};
  organizationMap: { [id: number]: string } = {};



  constructor(private organizationService:OrganizationService,private subjectGroupsService:SubjectgroupServiceService ,private SubjectService:SubjectServiceService,private toastr:ToastrService,private OrganizationService:OrganizationService) {
  }
  ngOnInit(): void {
    this.loadData()
    this.loadsubjectgroupNames()
    this.loadOrganizationNames()
  }


  loadData() : void {
    const getAllPromise = this.SubjectService.getAll().subscribe(res =>{
      if(res.isSuccess){
        this.toastr.info('tải dữ liệu thành công');
        console.log(res.result);
        this.testData = res.result as SubjectModel[];
      }
      else {
        this.toastr.error(res.message);
      }
    })
  }
  loadsubjectgroupNames() {
    this.subjectGroupsService.getAll().subscribe((res) => {
      if (res.isSuccess) {
        const sgroup: SubjectGroupModel[] = res.result as SubjectGroupModel[];
        sgroup.forEach((sg) => {
          this.subjectgroupMap[sg.id] = sg.name;
        });
      }
    });
  }

  loadOrganizationNames() {
    this.organizationService.getAll().subscribe((res) => {
      if (res.isSuccess) {
        const organization: OrganizationModel[] = res.result as OrganizationModel[];
        organization.forEach((o) => {
          this.organizationMap[o.id] = o.organizationName;
        });
      }
    });
  }
  deleteItem(item: SubjectModel){
    if(confirm(`Xác nhận xóa ${item.subjectName}`)){
      const deletePromise = this.SubjectService.delete(item.id).subscribe(res => {
        if(res.isSuccess){
          this.toastr.info('Xóa thành công');
          this.loadData();
        } else{
          this.toastr.error(res.message);
        }
      })
    }
  }


  protected readonly parseInt = parseInt;

}
