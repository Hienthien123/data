import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationModel } from 'src/app/models/organization.model';
import { SubjectGroupModel } from 'src/app/models/subjectGroup.model';
import { OrganizationServiceService } from 'src/app/services/admin/organization-service.service';
import { SubjectgroupServiceService } from 'src/app/services/admin/subjectgroup-service.service';

@Component({
  selector: 'app-form-sgroup',
  templateUrl: './form-sgroup.component.html',
  styleUrls: ['./form-sgroup.component.scss'],
})
export class FormSgroupComponent implements OnInit {
  organizationData: OrganizationModel[] = [];
  breadCrumb = [
    {
      title: 'Danh sách ngành học ',
      path: '/admin/subject-group',
    },
    {
      title: 'Thông tin ngành học ',
      path: '',
    },
  ];
  data: SubjectGroupModel = {
    id: 0,
    name: '',
    code: '',
    orderId: 0,
    organizationId: undefined,
  };
  itemId: string | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private sgroupService: SubjectgroupServiceService,
    private organizationService: OrganizationServiceService,
    private Router: Router
  ) {}
  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id');
    if (this.itemId) this.loadData(parseInt(this.itemId));
    this.LoadTen();
  }

  loadData(id: number) {
    const getDataPromise = this.sgroupService.getById(id).subscribe((res) => {
      if (res.isSuccess) {
        this.data = res.result as SubjectGroupModel;
      }
    });
  }

  LoadTen() {
    const getAllPromise1 = this.organizationService
      .getAll()
      .subscribe((res) => {
        if (res.isSuccess) {
          this.organizationData = res.result as OrganizationModel[];
        }
      });
  }
  submit() {
    if (this.itemId) {
      const addDataPromise = this.sgroupService
        .update(this.data)
        .subscribe((res) => {
          if (res.isSuccess) {
            this.Router.navigate(['/admin/subject-group']);
          }
        });
    } else {
      const addDataPromise = this.sgroupService
        .create(this.data)
        .subscribe((res) => {
          if (res.isSuccess) {
            this.Router.navigate(['/admin/subject-group']);
          }
        });
    }
  }
}
