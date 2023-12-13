import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { AddTestComponent } from './pages/test-page/add-test/add-test.component';
import { TestServiceService } from 'src/app/services/admin/test-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ChucDanhComponent } from './pages/chuc-danh/chuc-danh.component';
import { ChucDanhServiceService } from 'src/app/services/admin/chuc-danh-service.service';
import { AddUpdateChucDanhComponent } from './pages/chuc-danh/add-update-chuc-danh/add-update-chuc-danh.component';
import { FormsModule } from '@angular/forms';
import { StudentPageComponent } from './pages/student-page/student-page.component';
import { StudentFormComponent } from './pages/student-page/student-form/student-form.component';
import { StudentService } from 'src/app/services/admin/student.service';
import { DpDatePickerModule } from 'ng2-date-picker';
import { LocationSelectComponent } from 'src/app/shared/components/location-select/location-select.component';
import { LocationService } from 'src/app/services/admin/location.service';
import { OrganizationPageComponent } from './pages/organization-page/organization-page.component';
import { OrganizationFormComponent } from './pages/organization-page/organization-form/organization-form.component';
import { MonHocComponent } from './pages/mon-hoc/mon-hoc.component';
import { FormMonHocComponent } from './pages/mon-hoc/form-mon-hoc/form-mon-hoc.component';
import { SubjectGroupComponent } from './pages/subject-group/subject-group.component';
import { FormSgroupComponent } from './pages/subject-group/form-sgroup/form-sgroup.component';
import { OrganizationServiceService } from 'src/app/services/admin/organization-service.service';
import { SubjectgroupServiceService } from 'src/app/services/admin/subjectgroup-service.service';
import { GradeComponent } from './pages/grade/grade.component';
import { FormGradeComponent } from './pages/grade/form-grade/form-grade.component';
import { GradeService } from 'src/app/services/admin/grade.service';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';

import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import { EmployeeFormComponent } from './pages/employee-page/employee-form/employee-form.component';

import { EmployeeService } from 'src/app/services/admin/employee.service';
import { TuitionPageComponent } from './pages/tuition-page/tuition-page.component';
import { TuitionService } from 'src/app/services/admin/tuition.service';
import { TuitionFormComponent } from './pages/tuition-page/tuition-form/tuition-form.component';
import { EducationalYearComponent } from './pages/educational-year/educational-year.component';
import { EducationalYearService } from 'src/app/services/admin/educational-year.service';
import { FormEducationalYearComponent } from './pages/educational-year/form-educational-year/form-educational-year.component';
import { ClassPageComponent } from './pages/class-page/class-page.component';
import { ClassFormComponent } from './pages/class-page/class-form/class-form.component';
import { ClassResultComponent } from './pages/class-page/class-result/class-result.component';
import { TestScoreService } from 'src/app/services/admin/test-score.service';
import { StudentFilterComponent } from './pages/student-page/student-filter/student-filter.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClassRegisterComponent } from './pages/student-page/class-register/class-register.component';
import { ClassStudentListComponent } from './pages/class-page/class-student-list/class-student-list.component';
import { ClassAssignComponent } from './pages/employee-page/class-assign/class-assign.component';
import { EmployeeMapService } from 'src/app/services/admin/employee-maps-class.service';
import { StudentMapClassComponent } from './pages/student-page/student-map-class/student-map-class.component';
import { StudentMapsTuitionComponent } from './pages/tuition-page/student-maps-tuition/student-maps-tuition.component';
import { StudentMapTuitionService } from 'src/app/services/admin/student-map-tuition.service';
import { StudentMapTuitionEditComponent } from './pages/student-page/student-map-tuition-edit/student-map-tuition-edit.component';
import { TuitionTransactionServiceService } from 'src/app/services/admin/tuition-transaction-service.service';
import { KhoaHocComponent } from './pages/khoa-hoc/khoa-hoc.component';
import { KhoaHocService } from 'src/app/services/admin/khoa-hoc.service';
import { FormKhoaHocComponent } from './pages/khoa-hoc/form-khoa-hoc/form-khoa-hoc.component';
import { ChapterComponent } from './pages/chapter/chapter.component';
import { FormChapterComponent } from './pages/chapter/form-chapter/form-chapter.component';
import { LessonComponent } from './pages/lesson/lesson.component';
import { FormLessonComponent } from './pages/lesson/form-lesson/form-lesson.component';
import { UserComponent } from './pages/user/user.component';
import { FormUserComponent } from './pages/user/form-user/form-user.component';
import { ChapterService } from 'src/app/services/admin/chapter.service';
import { UserService } from 'src/app/services/admin/user.service';
import { LessonService } from 'src/app/services/admin/lesson.service';
@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    TestPageComponent,
    AddTestComponent,
    StudentPageComponent,
    StudentFormComponent,
    LocationSelectComponent,
    OrganizationPageComponent,
    OrganizationFormComponent,
    MonHocComponent,
    FormMonHocComponent,
    ChucDanhComponent,
    AddUpdateChucDanhComponent,
    StudentPageComponent,
    StudentFormComponent,
    LocationSelectComponent,
    SubjectGroupComponent,
    FormSgroupComponent,
    GradeComponent,
    FormGradeComponent,
    BreadcrumbComponent,
    EmployeeFormComponent,
    EmployeePageComponent,
    TuitionPageComponent,
    TuitionFormComponent,
        EducationalYearComponent,
        ClassRegisterComponent,
        ClassStudentListComponent,
        FormEducationalYearComponent,
        ClassPageComponent,
        ClassFormComponent,
        ClassResultComponent,
        StudentFilterComponent,
        ClassAssignComponent,
        StudentMapClassComponent,
        StudentMapsTuitionComponent,
        StudentMapTuitionEditComponent,
        KhoaHocComponent,
        FormKhoaHocComponent,
        ChapterComponent,
        FormChapterComponent,
        LessonComponent,
        FormLessonComponent,
        UserComponent,
        FormUserComponent,
    ],
  imports: [
    CommonModule,
    HttpClientModule,
    AdminRoutingModule,
    FormsModule,
    DpDatePickerModule,
    NgxPaginationModule
  ],
  providers: [
    TestServiceService,
    ChucDanhServiceService,
    StudentService,
    LocationService,
    OrganizationServiceService,
    SubjectgroupServiceService,
      GradeService,
      EmployeeService,
      TuitionService,
      EducationalYearService,
      TestScoreService,
      EmployeeMapService,
      StudentMapTuitionService,
      TuitionTransactionServiceService,
      KhoaHocService,
      ChapterService,
      UserService,
      LessonService,
  ]
})
export class AdminModule {}
