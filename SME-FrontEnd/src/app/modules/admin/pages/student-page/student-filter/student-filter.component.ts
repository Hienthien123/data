import { Component } from '@angular/core';
import * as moment from 'moment';
import { EGenders } from 'src/app/models/enums/genders.enum';
import { PaginatingSetModel } from 'src/app/models/paginatingSet.model';
import { PaginatingQueryModel } from 'src/app/models/queryModels/paginating-query.model';
import { QueryWithPaginationModel } from 'src/app/models/queryModels/queries.model';
import { StudentQueryModel } from 'src/app/models/queryModels/studentQuery.model';
import { StudentModel } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/admin/student.service';

@Component({
  selector: 'app-student-filter',
  templateUrl: './student-filter.component.html',
  styleUrls: ['./student-filter.component.scss']
})
export class StudentFilterComponent {
  breadCrumb = [
    {
      title: 'Danh sách học viên',
      path: '/admin/students'
    },
    {
      title: 'Lọc danh sách học viên',
      path: ''
    }
  ]

  listModel: PaginatingSetModel<StudentModel> = {
    page: 1,
    totalCount: 0,
    totalPage: 0,
    items: [],
    count: 0 
  };
  listModelQuery: PaginatingSetModel<StudentModel> = {
    page: 1,
    totalCount: 0,
    totalPage: 0,
    items: [],
    count: 0 
  };
  
  data: StudentModel = {
    id: 0,
    fullName: '',
    code: '',
    lastName: '',
    firstName: '',
    gender: EGenders.Male,
    dateOfBirth: new Date(),
    email: '',
    phoneNumber: '',
    ethnicity: '',
    status: 0,
    religion: '',
    identificationNumber: '',
    taxIdentificationNumber: '',
    nationality: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    emergencyContactJob: '',
    emergencyContactYearOfBirth: '',
    organizationId: undefined,
    address: {
      provinceId: 0,//50,
      districtId: 0,// 613,
      wardId: 0, //9456,
      specificLocation: ''
    },
    emergencyContactAddress: {
      provinceId: 0,//50,
      districtId: 0,// 613,
      wardId: 0, //9456,
      specificLocation: ''
    }
  };
  // studentQuery: StudentQueryModel = {
  //   organizationId: 0,//;
  //   fullName: '',
  //   doBFrom: new Date(),
  //   doBTo: new Date(),
  //   registerFrom: new Date(),
  //   registerTo: new Date(),
  //   provinceId: 0,
  //   districtId: 0,
  //   wardId: 0,
  // }
  
  queries: QueryWithPaginationModel = {
    pageNumber: 1,
    pageSize: 2,
    sortOrder: 0,
    filter: {
      organizationId: 0,
      fullName: '',
      registerFrom: '',
      registerTo: '',
      doBFrom: '',
      doBTo: '',
      
      provinceId: 0,
      districtId: 0,
      wardId: 0,
    }
    
  };
  
  //doBFrom = moment(this.queries.filter.doBFrom).format('yyyy-MM-DD');
  // doBTo = moment(this.queries.filter.doBTo).format('yyyy-MM-DD');
  // registerFrom = moment(this.queries.filter.registerFrom).format('yyyy-MM-DD');
  // registerTo = moment(this.queries.filter.registerTo).format('yyyy-MM-DD');

  defaultOption = {
    key: 0,
    value: '--Chọn--'
  }
  addressOptions = {
    province: [this.defaultOption],
    district: [this.defaultOption],
    wards: [this.defaultOption]
  }
  contactAddressOptions = {
    province: [this.defaultOption],
    district: [this.defaultOption],
    wards: [this.defaultOption]
  }
  itemId: string | null | undefined;
  constructor(private studentService: StudentService){}
  ngOnInit(): void {
    // this.getStudentsByFilter(this.queries.filter);
    // this.queries.filter.doBFrom = moment(this.doBFrom).toDate();
    // this.queries.filter.doBTo = moment(this.doBTo).toDate();
    this.loadData();
    // this.getStudentsQuery(this.queries);
}


getStudentsQuery(query: QueryWithPaginationModel) {
  // const doBFrom = moment(query.filter.doBFrom).format('yyyy-MM-DD');
  // const doBTo = moment(query.filter.doBTo).format('yyyy-MM-DD');
  // console.log(doBFrom +' and '+ doBTo);
  // query.filter.doBFrom = moment(doBFrom).toDate();
  // query.filter.doBTo = moment(doBTo).toDate();
  //query.filter.doBFrom = moment(query.filter.doBFrom).toDate();
  this.studentService.getStudents().subscribe(res => {
    this.listModel = res.result as PaginatingSetModel<StudentModel>;
    Object.keys(query.filter).forEach(key => {
      if (query.filter[key] == 0 || query.filter[key] == '' || query.filter[key] == new Date()) {
        delete query.filter[key]
      }
    });
    this.studentService.getStudents(query).subscribe(res => {
      if (res.isSuccess) { 
        console.log('query-filter', query);

        //      
        this.listModel = res.result as PaginatingSetModel<StudentModel>;
        
        console.log(this.listModel);
        //console.log(query);
        
      }
    });
  });
 
}
  loadData(){
    //this.queries.filter.doBFrom = moment(this.queries.filter.doBFrom).format('YYYY-MM-DD');
    this.studentService.getStudents().subscribe(res => {
        if(res.isSuccess){
          this.listModel = res.result as PaginatingSetModel<StudentModel>
          console.log(this.listModel);          
        }
        else{
          console.log(res.message);          
        }
      })
  }

  deleteItem(id?: number){
    if(id && confirm('Xác nhận xóa thông tin này')){
      this.studentService.deleteStudent(id).subscribe(res => {
        if(res.isSuccess){
          this.loadData();
        }
      })
    }
  }

  handleLocationChange(event: any){
    console.log(event);

    if(event.type == 1){
      if(event.objectName == 'address'){
        this.data.address!.provinceId = this.queries.filter.provinceId = event.value;
        this.data.address!.districtId = this.queries.filter.districtId = 0;
        this.data.address!.wardId = this.queries.filter.wardId = 0;
      } else {
        this.data.emergencyContactAddress!.provinceId = this.queries.filter.emergencyContactAddress!.provinceId = event.value;
        this.data.emergencyContactAddress!.districtId = this.queries.filter.emergencyContactAddress!.districtId = 0;
        this.data.emergencyContactAddress!.wardId = this.queries.filter.emergencyContactAddress!.wardId = 0;
      }
    } 
    else if(event.type == 2){
      if(event.objectName == 'address'){
        this.data.address!.districtId = this.queries.filter.districtId = event.value;      
        this.data.address!.wardId = this.queries.filter.wardId = 0;
      } else {
        this.data.emergencyContactAddress!.districtId = this.queries.filter.emergencyContactAddress!.districtId = event.value;
        this.data.emergencyContactAddress!.wardId = this.queries.filter.emergencyContactAddress!.wardId = 0;
      }
    }
    else if(event.type == 3){
      if(event.objectName == 'address'){
        this.queries.filter.wardId = event.value;
      }else{
        this.queries.filter.emergencyContactAddress!.wardId = event.value;
      }
    }
  }

  onTableDataChange(event: any) {
    
    this.listModel.page = event;
  }
  // onTableSizeChange(event: any): void {
  //   this.listModel.count = event.target.value;
  //   this.listModel.page = 1;
  //   this.loadData();
  // }
}
