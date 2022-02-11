import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboBoxBasicComponent } from './combo-box-basic.component';
import { UsaComboboxModule } from '@gsa-sam/ngx-uswds';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ComboBoxBasicComponent
  ],
  imports: [
    CommonModule,
    UsaComboboxModule,
    FormsModule,
  ],
  exports: [
    ComboBoxBasicComponent
  ]
})
export class ComboBoxBasicModule { }
