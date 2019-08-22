import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule } from '@angular/forms';
import { ApplicationPipesModule } from 'src/app/shareModules/app.pipes.module';


const routes: Routes = [
    { path: '', component: LoginComponent }
];

@NgModule({
  declarations: [
    LoginComponent,
    SignInComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ApplicationPipesModule
  ],
  exports: [RouterModule]
})

export class LoginRoutingModule { }
