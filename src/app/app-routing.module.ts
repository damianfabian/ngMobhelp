import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import LoginView from './views/login/login.component';
import HomeView from './views/home/home.component';
import { SignInComponent } from './views/login/sign-in/sign-in.component';
import { ChangePasswordComponent } from './views/login/change-password/change-password.component';

const routes: Routes = [
  { path: 'login', component: LoginView },
  { path: 'home',      component: HomeView },
  //{ path: 'settings', component: HeroListComponent },
  { path: '**', component: HomeView }
];

@NgModule({
  declarations: [
    LoginView,
    HomeView,
    SignInComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
