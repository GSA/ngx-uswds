import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsaTextareaModule, USWDSLabelWrapperModule } from '@gsa-sam/ngx-uswds';
import { TextareaWrapperComponent } from './textarea-wrapper.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsaTextareaModule,
    USWDSLabelWrapperModule,
  ],
  declarations: [TextareaWrapperComponent],
  exports: [TextareaWrapperComponent],
})
export class TextareaWrapperModule {}
