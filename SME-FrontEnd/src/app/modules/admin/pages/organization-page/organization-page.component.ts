import {Component, OnInit} from '@angular/core';
import {OrganizationModel} from "../../../../models/organization.model";
import {OrganizationService} from "../../../../services/admin/organization.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-organization-page',
  templateUrl: './organization-page.component.html',
  styleUrls: ['./organization-page.component.scss']
})
export class OrganizationPageComponent implements OnInit{
  testData:OrganizationModel[] = [];
  organizationMap: { [id: number]: string } = {};

  constructor(private OrganizationService:OrganizationService,private toast:ToastrService) {
  }
  ngOnInit(): void {
    this.loadData()
    this.loadOrganizationNames()
    console.log(this.testData)
  }
  loadData() : void {
    const getAllPromise = this.OrganizationService.getAll().subscribe(res =>{
      if(res.isSuccess){
        this.toast.info('tải dữ liệu thành công');
        console.log(res.result);
        this.testData = res.result as OrganizationModel[];
      }
      else {
        this.toast.error(res.message);
      }
    })
  }
  loadOrganizationNames() {
    this.OrganizationService.getAll().subscribe((res) => {
      if (res.isSuccess) {
        const organization: OrganizationModel[] = res.result as OrganizationModel[];
        organization.forEach((o) => {
          this.organizationMap[o.id] = o.organizationName;
        });
      }
    });
  }
  deleteItem(item: OrganizationModel){
    if(confirm(`Xác nhận xóa ${item.organizationName}`)){
      const deletePromise = this.OrganizationService.delete(item.id).subscribe(res => {
        if(res.isSuccess){
          this.toast.info('Xóa thành công');
          this.loadData();
        } else{
          this.toast.error(res.message);
        }
      })
    }
  }

}
