import { NgModule } from '@angular/core';
import { FilterPipe } from '../pipes/filter.pipe';
import { IconComponent } from '../components/icon/icon.component';
import { ModalComponent } from '../components/modal/modal.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FilterPipe,
    IconComponent,
    ModalComponent
  ],
  exports: [
    FilterPipe,
    IconComponent,
    ModalComponent
  ]
})
export class ApplicationPipesModule {}