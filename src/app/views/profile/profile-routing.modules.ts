import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { SettingsComponent } from './settings/settings.component';
import { LinksComponent } from './links/links.component';
import { HelpComponent } from './help/help.component';
import { ViewIconsComponent } from './icons/icons.component';
import { ApplicationPipesModule } from 'src/app/shareModules/app.share.module';


const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'help', component: HelpComponent },
  { path: 'links', component: LinksComponent },
  { path: 'icons', component: ViewIconsComponent }
];

@NgModule({
  declarations: [
    ProfileComponent,
    SettingsComponent,
    LinksComponent,
    ViewIconsComponent,
    HelpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ApplicationPipesModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class ProfileRoutingModule { }
