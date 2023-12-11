import { Component } from '@angular/core';
import * as moment from 'moment';
import { EGenders } from 'src/app/models/enums/genders.enum';
import { EmployeeModel } from 'src/app/models/Employee.model';
import { PaginatingSetModel } from 'src/app/models/paginatingSet.model';
import { EmployeeService } from 'src/app/services/admin/employee.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';
import { QueryWithPaginationModel } from 'src/app/models/queryModels/queries.model';
import { OrganizationModel } from 'src/app/models/organization.model';
import { OrganizationService } from 'src/app/services/admin/organization.service';
import { EmployeeQueryModel } from 'src/app/models/queryModels/paginating-query.model';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.scss'],
})
export class EmployeePageComponent implements OnInit {
  breadCrumb = [
    {
      title: 'Danh sách nhân sự',
      path: '/admin/employees'
    },
  ]

  testData: OrganizationModel[] = [];
  employeeData: EmployeeModel[] = [];
  listModel: PaginatingSetModel<EmployeeModel> = {
    page: 1,
    totalCount: 0,
    totalPage: 0,
    items: [],
    count: 0,
  };

  pageSize: number = 2;
  queries: QueryWithPaginationModel = {
    filter: {
      fullName: '',
      provinceId: 0,
      districtId: 0,
      wardId: 0,
      doBFrom: new Date(),
      doBTo: new Date(),
      organizationId: 0,
    },
    pageNumber: this.listModel.page,
    pageSize: this.pageSize,


  };
  constructor(
    private OrganizationService: OrganizationService,
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.loadData();
    this.getAllOrganization();

  }
  loadData(queries?: QueryWithPaginationModel) {

    this.employeeService.getEmployee(queries).subscribe(res => {
      if (res.isSuccess) {
        this.listModel = res.result;
      } else {
        console.log(res.message);
      }
    });
    console.log(queries);
  }



  // onFilterButtonClick() {
  //   const filteredFilterData: QueryWithPaginationModel = {
  //     filter: {}, 
  //   };

  //   if (this.queries.filter) {
  //     Object.keys(this.queries.filter).forEach((key) => {
  //       const filterValue = this.queries.filter[key as keyof EmployeeQueryModel];

  //       if (filterValue !== undefined && filterValue !== '' && filterValue !== 0 && !(filterValue instanceof Date)) {
  //         filteredFilterData.filter[key as keyof EmployeeQueryModel] = filterValue as any;
  //       }
  //     });

  //     this.loadData(filteredFilterData); 
  //     console.log(this.queries.filter);
  //   }
  // }

  onFilterButtonClick() {
    const filteredFilterData: QueryWithPaginationModel = {
      filter: {},
    };

    if (this.queries.filter) {
      Object.keys(this.queries.filter).forEach((key) => {
        const filterValue = this.queries.filter[key as keyof EmployeeQueryModel];

        if (filterValue !== undefined && filterValue !== '' && filterValue !== 0 && !(filterValue instanceof Date)) {
          filteredFilterData.filter[key as keyof EmployeeQueryModel] = filterValue as any;
        }
      });

      this.loadData(filteredFilterData);
      console.log(this.queries.filter);
    }
  }

  filterValue: string = '';
  showFilterInput: boolean = false;
  originalData: any[] = []; // Dữ liệu ban đầu
  filteredData: any[] = []; // Dữ liệu đã lọc
  
  toggleFilterInput() {
    this.showFilterInput = !this.showFilterInput;
    this.filterValue = ''; // Xóa giá trị nhập vào trường input khi ẩn hiện trường input
    this.filteredData = []; // Xóa dữ liệu đã lọc khi ẩn hiện trường input
  }
  
  filterData() {
    this.filteredData = this.originalData.filter(item => item.fullName.includes(this.filterValue));
  }




  loadLocation() {
  }

  handleLocationChange(event: any) {
    console.log(event);

    const { type, value } = event;
    if (type === 1) {
      this.queries.filter.provinceId = value;
      this.queries.filter.districtId = 0;
      this.queries.filter.wardId = 0;
    } else if (type === 2) {
      this.queries.filter.districtId = value;
      this.queries.filter.wardId = 0;
    } else if (type === 3) {
      this.queries.filter.wardId = value;

    }
  }


  onPageChange(pageNumber: number) {

    this.listModel.page = pageNumber;
  }

  getAllOrganization() {
    const getAllPromise = this.OrganizationService.getAll().subscribe(res => {
      if (res.isSuccess) {
        this.testData = res.result as OrganizationModel[];
      }
    })
  }

  showFilterInputs: boolean = false;

  toggleFilterInputs() {
    this.showFilterInputs = !this.showFilterInputs;
  }
  // onNextPage() {
  //   if (this.listModel.page < this.listModel.totalPage) {
  //     this.onPageChange(this.listModel.page + 1);
  //   }
  // }

  // onPreviousPage() {
  //   if (this.listModel.page > 1) {
  //     this.onPageChange(this.listModel.page - 1);
  //   }
  // }

  // onPageChange(pageNumber: number) {
  //   this.listModel.page = pageNumber;

  // }

  deleteItem(item: EmployeeModel) {
    if (confirm(`Xác nhận xóa ${item.fullName}`)) {
      const deletePromise = this.employeeService
        .delete(item.id)
        .subscribe((res) => {
          if (res.isSuccess) {
            this.toastr.info('Xóa thành công');
            this.loadData();
          } else {
            this.toastr.error(res.message);
          }
        });
    }
  }
}
