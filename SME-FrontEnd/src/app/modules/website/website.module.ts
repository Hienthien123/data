import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { WebsiteComponent } from './website.component';
import { CourseComponent } from './course/course.component';
import { FooterComponent } from './footer/footer.component';
import { CourseService } from 'src/app/services/website/course.service';
import { DataService } from 'src/app/services/website/data.service';
import { SliderComponent } from './slider/slider.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { GridviewComponent } from './gridview/gridview.component';
@NgModule({
  declarations: [
    AboutComponent,
    ContactComponent,
    OurServicesComponent,
    HeaderComponent,
    SearchComponent,
    WebsiteComponent,
    CourseComponent,
    FooterComponent,
    SliderComponent,
    GridviewComponent,
    
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    FormsModule,
    NgxPaginationModule,
  ],
  providers:[
    CourseService,
    DataService,
  ]
})
export class WebsiteModule { }
