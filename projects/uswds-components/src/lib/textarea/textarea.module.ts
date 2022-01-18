import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsaTextareaComponent } from './textarea.component';
import { USWDSFormFieldModule } from '../form-field/form-field.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsaTextareaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    USWDSFormFieldModule,
    FormsModule,
  ],
  exports: [UsaTextareaComponent],
})
export class UsaTextareaModule {}
