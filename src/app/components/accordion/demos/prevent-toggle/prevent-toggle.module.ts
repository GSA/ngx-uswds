import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreventToggleComponent } from './prevent-toggle.component';
import { UsaAccordionModule } from '@gsa-sam/ngx-uswds';



@NgModule({
  declarations: [PreventToggleComponent],
  imports: [
    CommonModule,
    UsaAccordionModule,
  ],
  exports: [
    PreventToggleComponent
  ],
})
export class PreventToggleModule { }
