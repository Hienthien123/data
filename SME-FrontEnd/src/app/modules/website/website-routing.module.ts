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
import { SurveyComponent } from './survey/survey.component';

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
    path: 'test',
    component: TestComponent
  },  
  {
    path: 'detail',
    component: DetailComponent
  }, 
  {
    path: 'survey',
    component: SurveyComponent
  }, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
