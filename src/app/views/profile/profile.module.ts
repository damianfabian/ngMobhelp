import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.modules';

@NgModule({
  imports: [
    ProfileRoutingModule
  ],
  exports: [ProfileRoutingModule]
})
export class ProfileModule { }