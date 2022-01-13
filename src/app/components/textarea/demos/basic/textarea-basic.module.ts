import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsaTextareaModule } from '@gsa-sam/ngx-uswds';
import { TextareaBasicComponent } from './textarea-basic.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, UsaTextareaModule],
  declarations: [TextareaBasicComponent],
  exports: [TextareaBasicComponent],
})
export class TextareaBasicModule {}
