import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsaTextareaModule, USWDSFormFieldModule } from '@gsa-sam/ngx-uswds';
import { TextareaWrapperComponent } from './textarea-wrapper.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsaTextareaModule,
    USWDSFormFieldModule,
  ],
  declarations: [TextareaWrapperComponent],
  exports: [TextareaWrapperComponent],
})
export class TextareaWrapperModule {}
