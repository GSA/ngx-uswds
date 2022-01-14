import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsaTextareaModule, USWDSLabelWrapperModule } from '@gsa-sam/ngx-uswds';
import { TextareaBasicComponent } from './textarea-basic.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsaTextareaModule,
    USWDSLabelWrapperModule,
  ],
  declarations: [TextareaBasicComponent],
  exports: [TextareaBasicComponent],
})
export class TextareaBasicModule {}
