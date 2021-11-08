import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioBasicComponent } from './radio-basic.component';
import { UsaRadioModule } from '@gsa-sam/ngx-uswds';



@NgModule({
  declarations: [RadioBasicComponent],
  imports: [
    CommonModule,
    UsaRadioModule,
  ],
  exports: [RadioBasicComponent]
})
export class RadioBasicModule { }
