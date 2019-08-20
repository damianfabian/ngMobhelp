import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplicationPipesModule } from 'src/app/shareModules/app.pipes.module';
import { SettingsComponent } from '../settings/settings.component';
import { LinksComponent } from '../links/links.component';
import { HelpComponent } from '../help/help.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { HandbookComponent } from '../handbook/handbook.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'help', component: HelpComponent },
  { path: 'links', component: LinksComponent },
  { path: 'handbook', component: HandbookComponent }
];

@NgModule({
  declarations: [
    ProfileComponent,
    SettingsComponent,
    LinksComponent,
    HelpComponent,
    ModalComponent,
    HandbookComponent 
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ApplicationPipesModule,
    FontAwesomeModule
  ],
  exports: [RouterModule]
})

export class ProfileRoutingModule { }
