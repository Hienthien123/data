import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { EGenders } from 'src/app/models/enums/genders.enum';
import { StudentModel } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/admin/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  breadCrumb = [
    {
      title: 'Danh sách học viên',
      path: '/admin/students',
    },
    {
      title: 'Thông tin học viên',
      path: '',
    },
  ];
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
    address: {
      provinceId: 0, //50,
      districtId: 0, // 613,
      wardId: 0, //9456,
      specificLocation: '',
    },
    emergencyContactAddress: {
      provinceId: 0, //50,
      districtId: 0, // 613,
      wardId: 0, //9456,
      specificLocation: '',
    },
  };
  doBString = moment(this.data.dateOfBirth).format('yyyy-MM-DD');
  defaultOption = {
    key: 0,
    value: '--Chọn--',
  };
  addressOptions = {
    province: [this.defaultOption],
    district: [this.defaultOption],
    wards: [this.defaultOption],
  };
  contactAddressOptions = {
    province: [this.defaultOption],
    district: [this.defaultOption],
    wards: [this.defaultOption],
  };
  itemId: string | null | undefined;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
    if (this.itemId) this.loadData(parseInt(this.itemId));
  }

  loadData(id: number) {
    const getDataPromise = this.studentService
      .getStudentById(id)
      .subscribe((res) => {
        if (res.isSuccess) {
          this.data = res.result as StudentModel;
          this.doBString = moment(this.data.dateOfBirth).format('yyyy-MM-DD');
          console.log(this.doBString);
        }
      });
  }

  loadLocation() {}

  handleLocationChange(event: any) {
    console.log(event);

    if (event.type == 1) {
      if (event.objectName == 'address') {
        this.data.address!.provinceId = event.value;
        this.data.address!.districtId = 0;
        this.data.address!.wardId = 0;
      } else {
        this.data.emergencyContactAddress!.provinceId = event.value;
        this.data.emergencyContactAddress!.districtId = 0;
        this.data.emergencyContactAddress!.wardId = 0;
      }
    } else if (event.type == 2) {
      if (event.objectName == 'address') {
        this.data.address!.districtId = event.value;
        this.data.address!.wardId = 0;
      } else {
        this.data.emergencyContactAddress!.districtId = event.value;
        this.data.emergencyContactAddress!.wardId = 0;
      }
    } else if (event.type == 3) {
      if (event.objectName == 'address') {
        this.data.address!.wardId = event.value;
      } else {
        this.data.emergencyContactAddress!.wardId = event.value;
      }
    }
  }

  submit() {
    console.log(this.data);
    this.data.dateOfBirth = moment(this.doBString).toDate();
    this.data.fullName = this.data.lastName + ' ' + this.data.firstName;
    if (this.itemId) {
      const addDataPromise = this.studentService
        .updateStudent(this.data)
        .subscribe((res) => {
          if (res.isSuccess) {
            console.log(this.data);

            this.router.navigate(['/admin/students']);
          }
        });
    } else {
      const addDataPromise = this.studentService
        .addStudent(this.data)
        .subscribe((res) => {
          if (res.isSuccess) {
            console.log(this.data);

            this.router.navigate(['/admin/students']);
          }
        });
    }
  }

  checkFormValid() {
    var checking =
      this.data.firstName == '' ||
      this.data.lastName == '' ||
      this.data.email == '' ||
      this.data.phoneNumber == '' ||
      this.data.ethnicity == '' ||
      this.data.religion == '' ||
      this.data.identificationNumber == '' ||
      this.data.nationality == '' ||
      this.data.address!.provinceId == 0 ||
      this.data.address!.districtId == 0 ||
      this.data.address!.wardId == 0 ||
      this.data.address!.specificLocation == '' ||
      this.data.emergencyContactAddress!.provinceId == 0 ||
      this.data.emergencyContactAddress!.districtId == 0 ||
      this.data.emergencyContactAddress!.wardId == 0 ||
      this.data.emergencyContactAddress!.specificLocation == '';
    return checking;
  }
}
