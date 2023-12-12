import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { SignComponent } from './sign/sign.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AuthComponent,
    SignComponent,
  ],
  imports: [
    CommonModule, 
    AuthRoutingModule,      
    FormsModule,
    RouterModule
  ],
})
export class AuthModule { }
