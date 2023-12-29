import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { AddTestComponent } from './pages/test-page/add-test/add-test.component';
import { StudentPageComponent } from './pages/student-page/student-page.component';
import { StudentFormComponent } from './pages/student-page/student-form/student-form.component';
import { OrganizationPageComponent } from "./pages/organization-page/organization-page.component";
import { OrganizationFormComponent } from "./pages/organization-page/organization-form/organization-form.component";
import { MonHocComponent } from "./pages/mon-hoc/mon-hoc.component";
import { FormMonHocComponent } from "./pages/mon-hoc/form-mon-hoc/form-mon-hoc.component";
import { ChucDanhComponent } from './pages/chuc-danh/chuc-danh.component';
import { AddUpdateChucDanhComponent } from './pages/chuc-danh/add-update-chuc-danh/add-update-chuc-danh.component';
import { SubjectGroupComponent } from './pages/subject-group/subject-group.component';
import { FormSgroupComponent } from './pages/subject-group/form-sgroup/form-sgroup.component';
import { GradeComponent } from './pages/grade/grade.component';
import { FormGradeComponent } from './pages/grade/form-grade/form-grade.component';
import { EmployeeFormComponent } from './pages/employee-page/employee-form/employee-form.component';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import { TuitionPageComponent } from './pages/tuition-page/tuition-page.component';
import { TuitionFormComponent } from './pages/tuition-page/tuition-form/tuition-form.component';
import { EducationalYearComponent } from './pages/educational-year/educational-year.component';
import { FormEducationalYearComponent } from './pages/educational-year/form-educational-year/form-educational-year.component';
import { ClassPageComponent } from './pages/class-page/class-page.component';
import { ClassFormComponent } from './pages/class-page/class-form/class-form.component';
import { ClassResultComponent } from './pages/class-page/class-result/class-result.component';
import { StudentFilterComponent } from './pages/student-page/student-filter/student-filter.component';
import { ClassRegisterComponent } from "./pages/student-page/class-register/class-register.component";
import { ClassStudentListComponent } from './pages/class-page/class-student-list/class-student-list.component';
import { StudentMapClassComponent } from './pages/student-page/student-map-class/student-map-class.component';
import { StudentMapTuitionService } from 'src/app/services/admin/student-map-tuition.service';
import { StudentMapsTuitionComponent } from './pages/tuition-page/student-maps-tuition/student-maps-tuition.component';
import { StudentMapsClassService } from 'src/app/services/admin/student-maps-class.service';
import { StudentMapTuitionEditComponent } from './pages/student-page/student-map-tuition-edit/student-map-tuition-edit.component';
import { KhoaHocComponent } from './pages/khoa-hoc/khoa-hoc.component';
import { FormKhoaHocComponent } from './pages/khoa-hoc/form-khoa-hoc/form-khoa-hoc.component';
import { ChapterComponent } from './pages/chapter/chapter.component';
import { FormChapterComponent } from './pages/chapter/form-chapter/form-chapter.component';
import { LessonComponent } from './pages/lesson/lesson.component';
import { FormLessonComponent } from './pages/lesson/form-lesson/form-lesson.component';
import { UserComponent } from './pages/user/user.component';
import { FormUserComponent } from './pages/user/form-user/form-user.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ReviewComponent } from './pages/review/review.component';
import { FormReviewComponent } from './pages/review/form-review/form-review.component';

import { autGuardGuard } from 'src/app/auth/auth.guard';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PineChartComponent } from './pine-chart/pine-chart.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'dashboard2',
        component: DashboardComponent
      },
      {
        path: 'dashboard3',
        component: DashboardComponent
      },
      {
        path: 'test',
        component: TestPageComponent
      },
      {
        path: 'test/add',
        component: AddTestComponent
      },
      {
        path: 'test/update/:id',
        component: AddTestComponent
      },
      {
        path: 'students',
        component: StudentPageComponent
      },
      {
        path: 'students/add',
        component: StudentFormComponent
      },
      {
        path: 'students/update/:id',
        component: StudentFormComponent
      },
      {
        path: 'students/filter/update/:id',
        component: StudentFormComponent
      },
      {
        path: 'students/register/:id',
        component: ClassRegisterComponent
      },
      {
        path: 'students/filter',
        component: StudentFilterComponent
      },
      {
        path: 'organization',
        component: OrganizationPageComponent
      },
      {
        path: 'organization/add',
        component: OrganizationFormComponent
      },
      {
        path: 'organization/update/:id',
        component: OrganizationFormComponent
      },
      {
        path: 'mon-hoc',
        component: MonHocComponent
      },
      {
        path: 'mon-hoc/add',
        component: FormMonHocComponent
      },
      {
        path: 'mon-hoc/edit/:id',
        component: FormMonHocComponent
      },
      {
        path: 'subject-group',
        component: SubjectGroupComponent
      },
      {
        path: 'subject-group/add',
        component: FormSgroupComponent
      },
      {
        path: 'subject-group/update/:id',
        component: FormSgroupComponent
      },
      {
        path: 'grade',
        component: GradeComponent
      },
      {
        path: 'grade/add',
        component: FormGradeComponent
      },
      {
        path: 'grade/update/:id',
        component: FormGradeComponent
      },
      {
        path: 'titles',
        component: ChucDanhComponent
      },
      {
        path: 'titles/add',
        component: AddUpdateChucDanhComponent
      },
      {
        path: 'titles/update/:id',
        component: AddUpdateChucDanhComponent
      },
      {
        path: 'employees',
        component: EmployeePageComponent
      },
      {
        path: 'employees/add',
        component: EmployeeFormComponent
      },
      {
        path: 'employees/update/:id',
        component: EmployeeFormComponent
      },
      {
        path: 'tuitions',
        component: TuitionPageComponent
      },
      {
        path: 'tuitions/add',
        component: TuitionFormComponent
      },
      {
        path: 'tuitions/update/:id',
        component: TuitionFormComponent
      },
      //
      {
        path: 'educationalYears',
        component: EducationalYearComponent
      },
      {
        path: 'educationalYears/add',
        component: FormEducationalYearComponent
      },
      {
        path: 'educationalYears/update/:id',
        component: FormEducationalYearComponent
      },
      {
        path: 'class',
        component: ClassPageComponent
      },
      {
        path: 'class/add',
        component: ClassFormComponent
      },
      {
        path: 'class/update/:id',
        component: ClassFormComponent
      },
      {
        path: 'class/lop/:id',
        component: StudentMapClassComponent,
      },
      {
        path: 'class/scores/:id',
        component: ClassResultComponent
      },
      {
        path: 'tuitions/studenMapsTuition',
        component: StudentMapsTuitionComponent
      },
      {
        path: 'class/lop/:id/studenMapsTuition/edit',
        component: StudentMapTuitionEditComponent
      },
      {
        path: 'khoa-hoc',
        component: KhoaHocComponent,
      },
      {
        path: 'khoa-hoc/add',
        component: FormKhoaHocComponent,
      },
      {
        path: 'khoa-hoc/edit/:_id',
        component: FormKhoaHocComponent,
      },
      {
        path: 'chapter',
        component: ChapterComponent,
      },
      {
        path: 'chapter/:course_id',
        component: ChapterComponent,
      },
      {
        path: 'chapter/:course_id/add',
        component: FormChapterComponent,
      },
      {
        path: 'chapter/:course_id/edit/:_id',
        component: FormChapterComponent,
      },
      {
        path: 'lesson',
        component: LessonComponent,
      },
      {
        path: 'lesson/:course_id/:chapter_id',
        component: LessonComponent,
      },
      {
        path: 'lesson/:course_id/:chapter_id/add',
        component: FormLessonComponent,
      },
      {
        path: 'lesson/:course_id/:chapter_id/edit/:_id',
        component: FormLessonComponent,
      },
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'user/add',
        component: FormUserComponent,
      },
      {
        path: 'user/edit/:_id',
        component: FormUserComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent,
      },
      {
        path: 'review',
        component: ReviewComponent,
      },
      {
        path: 'review/:course_id',
        component: ReviewComponent,
      },
      {
        path: 'review/:course_id/edit/:_id',
        component: FormReviewComponent,
      },
      {
        path: 'review/:course_id/add',
        component: FormReviewComponent,
      },
      {
        path:'line-chart',
        component: LineChartComponent
      },
      {
        path:'pine-chart',
        component: PineChartComponent
      }
    ]
  }
];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
