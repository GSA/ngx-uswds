import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsaTextareaComponent } from './textarea.component';
import { USWDSLabelWrapperModule } from '../form-field/form-field.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsaTextareaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    USWDSLabelWrapperModule,
    FormsModule,
  ],
  exports: [UsaTextareaComponent],
})
export class UsaTextareaModule {}
