import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteComponent } from './website.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { autGuardGuard } from 'src/app/auth/auth.guard';
import { CourseComponent } from './course/course.component';
import { SliderComponent } from './slider/slider.component';
import { GridviewComponent } from './gridview/gridview.component';
import { TestComponent } from './test/test.component';
import { DetailComponent } from './detail/detail.component';
import { ProfileComponent } from './profile/profile.component';
import { PaymentService } from 'src/app/services/website/payment.service';
import { PaymentComponent } from './payment/payment.component';
import { CancelComponent } from './payment/cancel/cancel.component';
import { DetailCourseComponent } from './detail-course/detail-course.component';
import { CourseDetailComponent } from './course/course-detail/course-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



const routes: Routes = [
  {
    path: '',
    component: WebsiteComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'services',
    component: OurServicesComponent
  },
  {
    path: 'course',
    component: CourseComponent
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'course/detail/:_id',
    component: CourseDetailComponent
  },    
  {
    path: 'profile',
    component: UserProfileComponent
  },   
  {
    path: 'profile/:_id',
    component: UserProfileComponent
  }, 
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'payment/:_id/:hash',
    component: PaymentComponent
  },
  {
    path:'detail-coures',
   component: DetailCourseComponent
  }

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
