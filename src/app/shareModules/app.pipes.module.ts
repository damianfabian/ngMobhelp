import { NgModule } from '@angular/core';
import { FilterPipe } from '../pipes/filter.pipe';
import { IconComponent } from '../components/icon/icon.component';

@NgModule({
  imports: [
    //
  ],
  declarations: [ 
    FilterPipe,
    IconComponent
  ],
  exports: [
    FilterPipe,
    IconComponent
  ]
})
export class ApplicationPipesModule {}