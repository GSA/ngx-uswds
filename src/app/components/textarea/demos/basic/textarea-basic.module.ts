import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  UsaCharacterCountModule,
  UsaTextareaModule,
  USWDSLabelWrapperModule,
} from '@gsa-sam/ngx-uswds';
import { TextareaBasicComponent } from './textarea-basic.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsaTextareaModule,
    USWDSLabelWrapperModule,
    UsaCharacterCountModule,
  ],
  declarations: [TextareaBasicComponent],
  exports: [TextareaBasicComponent],
})
export class TextareaBasicModule {}
