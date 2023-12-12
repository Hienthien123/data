import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SignComponent } from './sign/sign.component';
import { CommaExpr } from '@angular/compiler';
import { TuitionFormComponent } from '../admin/pages/tuition-page/tuition-form/tuition-form.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'singin',
    component: SignComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
