import { Component } from '@angular/core';
import { StudentMapsTuition } from 'src/app/models/studentMapsTuition';
import { StudentModel } from 'src/app/models/student.model';
import { EGenders } from 'src/app/models/enums/genders.enum';
import { TuitionModel } from 'src/app/models/tuition.model';
import { StudentService } from 'src/app/services/admin/student.service';
import { TuitionService } from 'src/app/services/admin/tuition.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentMapsClassService } from 'src/app/services/admin/student-maps-class.service';
import { StudentMapTuitionService } from 'src/app/services/admin/student-map-tuition.service';
import { ClassModel } from 'src/app/models/class.model';
import { ClassServiceService } from 'src/app/services/admin/class-service.service';
import { tuitionTransaction } from 'src/app/models/tuitionTransaction';

@Component({
  selector: 'app-student-maps-tuition',
  templateUrl: './student-maps-tuition.component.html',
  styleUrls: ['./student-maps-tuition.component.scss']
})

export class StudentMapsTuitionComponent {


  dataStudent: StudentModel[] = [];
  dataClass: ClassModel[] = [];
  dataTuiton: TuitionModel[] = [];
  itemId: string | null | undefined;



  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id');
    this.getAllStudent();
    this.getAllTuition();
    this.getAllClass()
  }

  data: StudentMapsTuition = {
    id: 0,
    studentId: 0,
    student: {
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
        provinceId: 0,
        districtId: 0,
        wardId: 0,
        specificLocation: ''
      },
      emergencyContactAddress: {
        provinceId: 0,
        districtId: 0,
        wardId: 0,
        specificLocation: ''
      }
    },
    classId: 0,
    class: {
      id: 0,
      name: '',
      code: '',
      organizationId: 0,
      classSize: 0,
      credits: 0,
      gradeId: 0,
      subjectId: 0,
      subjectGroupId: 0,
    },
    tuitionId: 0,
    tuition: { id: 0, title: '', amountOfMoney: 0, note: '' },
    discountPercentage: 0,
    discountAmount: 0,
    Note: '',
    appliedDate: new Date(),
    endDate: new Date()
  };
  constructor(private studenService: StudentService,
    private tuitionService: TuitionService,
    private route: ActivatedRoute,
    private studentMapsTuitionServices: StudentMapTuitionService,
    private classServices: ClassServiceService,
    private router: Router) {
  }

  getAllStudent() {
    const getAllPromise = this.studenService.getAll().subscribe(res => {
      if (res.isSuccess) {
        this.dataStudent = res.result as StudentModel[];
      }
    })
  }
  getAllTuition() {
    const getAllPromise = this.tuitionService.getAll().subscribe(res => {
      if (res.isSuccess) {
        this.dataTuiton = res.result as TuitionModel[];
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
    console.log(this.data)
    if (this.itemId) {
      const addDataPromise = this.studentMapsTuitionServices.update(this.data).subscribe(res => {
        if (res.isSuccess) {
          this.router.navigate(['/admin/mon-hoc'])
        }
      })
    } else {
      const addDataPromise = this.studentMapsTuitionServices.create(this.data).subscribe(res => {
        console.log(addDataPromise);
        if (res.isSuccess) {
          this.router.navigate(['/admin/mon-hoc'])
        }
      })
    }
  }
  isFormValid(): boolean {
    return !!(this.data.discountPercentage && this.data.discountAmount && this.data.studentId && this.data.tuitionId);
  }
}