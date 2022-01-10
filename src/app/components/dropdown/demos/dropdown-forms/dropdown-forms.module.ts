import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownFormsComponent } from './dropdown-forms.component';
import { UsaDropdownModule } from '@gsa-sam/ngx-uswds';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [DropdownFormsComponent],
  imports: [
    CommonModule,
    UsaDropdownModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [DropdownFormsComponent]
})
export class DropdownFormsModule { }
