import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './views/home/home.component';
import { PageViewerComponent } from './views/page-viewer/page-viewer.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { WizardComponent } from './views/wizard/wizard.component';
import { DynamicHTMLModule } from './components/dynamicHtml';
import { IconComponent } from './components/icon/icon.component';
import { ApplicationPipesModule } from './shareModules/app.share.module';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./views/login/login.module').then(mod => mod.LoginModule) },
  { path: 'home', component: HomeComponent },
  { path: 'pageViewer', component: PageViewerComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', loadChildren: () => import('./views/profile/profile.module').then(mod => mod.ProfileModule) },
  { path: 'wizard', component: WizardComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    HomeComponent,
    PageViewerComponent,
    DashboardComponent,
    WizardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    DynamicHTMLModule.forRoot({
      components: [
        { component: IconComponent, selector: 'app-icon' }
      ]
    }),
    ApplicationPipesModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
