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

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'help', component: HelpComponent },
  { path: 'links', component: LinksComponent }
];

@NgModule({
  declarations: [
    ProfileComponent,
    SettingsComponent,
    LinksComponent,
    HelpComponent,
    ModalComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ApplicationPipesModule
  ],
  exports: [RouterModule]
})

export class ProfileRoutingModule { }
