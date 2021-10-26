import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioFormsComponent } from './radio-forms.component';
import { UsaRadioModule } from 'uswds-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [RadioFormsComponent],
  imports: [
    CommonModule,
    UsaRadioModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RadioFormsComponent]
})
export class RadioFormsModule { }
