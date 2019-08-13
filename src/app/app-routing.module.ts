import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import LoginView from './views/login/login.component';
import HomeView from './views/home/home.component';
import { SignInComponent } from './views/login/sign-in/sign-in.component';
import { ChangePasswordComponent } from './views/login/change-password/change-password.component';
import { PageViewerComponent } from './views/page-viewer/page-viewer.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileComponent } from './views/profile/profile.component';
import { WizardComponent } from './views/wizard/wizard.component';
import { ApplicationPipesModule } from './shareModules/app.pipes.module';

const routes: Routes = [
  { path: 'login', component: LoginView },
  { path: 'home',      component: HomeView },
  { path: 'pageViewer', component: PageViewerComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'wizard',      component: WizardComponent },
  { path: '**', component: HomeView }
];

@NgModule({
  declarations: [
    LoginView,
    HomeView,
    SignInComponent,
    ChangePasswordComponent,
    PageViewerComponent,
    DashboardComponent,
    WizardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes),
    ApplicationPipesModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
