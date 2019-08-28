import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyComponent } from './emptyComponent';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EmptyComponent
  ],
  exports: [
    EmptyComponent
  ]
})
export class ShareTestModule {}