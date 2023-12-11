import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClassModel } from 'src/app/models/class.model';
import { PaginatingSetModel } from 'src/app/models/paginatingSet.model';
import { StudentModel } from 'src/app/models/student.model';
import { StudentMapsTuition } from 'src/app/models/studentMapsTuition';
import { studentMoneyMonth } from 'src/app/models/studentMoneyMonth';
import { TuitionModel } from 'src/app/models/tuition.model';
import { ClassServiceService } from 'src/app/services/admin/class-service.service';
import { StudentMapTuitionService } from 'src/app/services/admin/student-map-tuition.service';
import { StudentService } from 'src/app/services/admin/student.service';
import { TuitionService } from 'src/app/services/admin/tuition.service';
import { EGenders } from 'src/app/models/enums/genders.enum';
import { tuitionTransaction } from 'src/app/models/tuitionTransaction';
import { TuitionTransactionServiceService } from 'src/app/services/admin/tuition-transaction-service.service';

@Component({
  selector: 'app-student-map-tuition-edit',
  templateUrl: './student-map-tuition-edit.component.html',
  styleUrls: ['./student-map-tuition-edit.component.scss']
})
export class StudentMapTuitionEditComponent {
  studentMapMoneyMonth: studentMoneyMonth[] = [];
  studentMaps: StudentMapsTuition[] = [];
  studentMapsClassStudentid: { [studentId: number]: number } = {};
  studentMapsClassid: { [classId: number]: number } = {};
  studentMapsTuition: { [tuitionId: number]: number } = {};
  studentName: { [id: number]: string } = {};
  studentTuitionDate: { [id: string]: string } = {};
  studentTuitionDate1: { [id: string]: string } = {};
  studentTuitionDate2: { [id: string]: string } = {};
  studentClassName: { [id: number]: string } = {};
  listModel: PaginatingSetModel<StudentModel> = {
    page: 1,
    totalCount: 0,
    totalPage: 0,
    items: [],
    count: 0
  };
  dataStudent: StudentModel[] = [];
  dataClass: ClassModel[] = [];
  itemId: string | null | undefined;
  dataTuitionTransaction: tuitionTransaction = {
    id: 0,
    studentId: 0,
    // student: {
    //   id: 0,
    //   fullName: '',
    //   code: '',
    //   lastName: '',
    //   firstName: '',
    //   gender: EGenders.Male,
    //   dateOfBirth: new Date(),
    //   email: '',
    //   phoneNumber: '',
    //   ethnicity: '',
    //   status: 0,
    //   religion: '',
    //   identificationNumber: '',
    //   taxIdentificationNumber: '',
    //   nationality: '',
    //   emergencyContactName: '',
    //   emergencyContactNumber: '',
    //   emergencyContactJob: '',
    //   emergencyContactYearOfBirth: '',
    //   address: {
    //     provinceId: 0,
    //     districtId: 0,
    //     wardId: 0,
    //     specificLocation: ''
    //   },
    //   emergencyContactAddress: {
    //     provinceId: 0,
    //     districtId: 0,
    //     wardId: 0,
    //     specificLocation: ''
    //   }
    // },
    classId: 0,
    // class: {
    //   id: 0,
    //   name: '',
    //   code: '',
    //   organizationId: 0,
    //   classSize: 0,
    //   credits: 0,
    //   gradeId: 0,
    //   subjectId: 0,
    //   subjectGroupId: 0,
    // },
    classMonth: 0,
    classYear: 0,
    note: '',
    amountOfMoney: 0,
    transactionBankCustomer: '',
    transactionCardNumber: '',
    transactionCardBrand: '',
    transactionType: '',
    transactionDate: new Date(),
  };



  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
    if (this.itemId) this.GetByloadMapClassStudentId(parseInt(this.itemId));

    this.itemId = this.route.snapshot.paramMap.get('id');
    if (this.itemId) this.getStudentMoneyMonth(parseInt(this.itemId));

    this.loadStudentNames();
    this.loadStudentClassName();
    this.loadStudentTuitionName();
    this.loadStudentDate();
    this.getAllClass();
    this.getAllStudent();
  }

  constructor(
    private studentMapsTuitionService: StudentMapTuitionService,
    private studentService: StudentService,
    private classService: ClassServiceService,
    private tuitionSerive: TuitionService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private studenService: StudentService,
    private tuitionTransactionServices: TuitionTransactionServiceService,
    private classServices: ClassServiceService,
    private router: Router,
  ) { }



  GetByloadMapClassStudentId(studentId: number) {
    this.studentMapsTuitionService.getById(studentId).subscribe((res) => {
      if (res.isSuccess) {
        const student: StudentMapsTuition[] = res.result as StudentMapsTuition[];
        student.forEach((st) => {
          this.studentMapsClassStudentid[st.id] = st.studentId;
          this.studentMapsClassid[st.id] = st.classId;
        });
        this.studentMaps = student;
      }
      console.log(this.studentMaps)
    });
  }
  /// thong tin getStudent
  getStudentMoneyMonth(studentId: number) {
    this.studentMapsTuitionService.getStudentMoneyMonth(studentId).subscribe((res) => {
      if (res.isSuccess) {
        const student: studentMoneyMonth[] = res.result as studentMoneyMonth[];
        this.studentMapMoneyMonth = student;
      }
      console.log(this.studentMapMoneyMonth)
    });
  }


  loadStudentDate() {
    this.studentMapsTuitionService.getAll().subscribe((res) => {
      if (res.isSuccess) {
        const studentName: StudentMapsTuition[] = res.result as StudentMapsTuition[];
        studentName.forEach((stn) => {
          const formattedDate = this.formatDateString(new Date(stn.appliedDate));
          const formattedDate1 = this.formatDateString(new Date(stn.endDate));
          this.studentTuitionDate[stn.id] = formattedDate;
          this.studentTuitionDate1[stn.id] = formattedDate1;
        });
        console.log(this.studentTuitionDate1);
        console.log(this.studentTuitionDate);
      }
    });
  }

  formatDateString(date: Date): string {
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  }

  loadStudentNames() {
    this.studentService.getAll().subscribe((res) => {
      if (res.isSuccess) {
        const studentName: StudentModel[] = res.result as StudentModel[];
        studentName.forEach((stn) => {
          this.studentName[stn.id] = stn.fullName;
        });
      }
    });
  }
  getStudentTuitionDate(id: number): string {
    if (this.studentTuitionDate[id]) {
      return this.studentTuitionDate[id];
    } else {
      return '';
    }
  }

  loadStudentClassName() {
    this.classService.getAll().subscribe((res) => {
      if (res.isSuccess) {
        const className: ClassModel[] = res.result as ClassModel[];
        className.forEach((stnl) => {
          this.studentClassName[stnl.id] = stnl.name;
        });
      }
    });
  }
  loadStudentTuitionName() {
    this.tuitionSerive.getAll().subscribe((res) => {
      if (res.isSuccess) {
        const tuitionName: TuitionModel[] = res.result as TuitionModel[];
        tuitionName.forEach((stnl) => {
          this.studentMapsTuition[stnl.id] = stnl.amountOfMoney;
        });
      }
    });
  }
  getAllStudent() {
    const getAllPromise = this.studenService.getAll().subscribe(res => {
      if (res.isSuccess) {
        this.dataStudent = res.result as StudentModel[];
      }
    })
  }


  getAllClass() {
    const getAllPromise = this.classServices.getAll().subscribe(res => {
      if (res.isSuccess) {
        this.dataClass = res.result as ClassModel[];
      }

    })
  }
  submit() {
      const addDataPromise = this.tuitionTransactionServices.create(this.dataTuitionTransaction).subscribe(res => {
        if(res.isSuccess){
          this.router.navigate(['/admin/mon-hoc'])
        }
      })
  }
  isFormValid(): boolean {
    return !!(this.dataTuitionTransaction.amountOfMoney && this.dataTuitionTransaction.transactionType
       && this.dataTuitionTransaction.studentId && this.dataTuitionTransaction.classId
       );
  }
}
