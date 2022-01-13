import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsaTextareaComponent } from './textarea.component';
import { UsaCharacterCountModule } from '../character-count/character-count.module';
import { USWDSLabelWrapperModule } from '../label-wrapper/label-wrapper.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsaTextareaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsaCharacterCountModule,
    USWDSLabelWrapperModule,
    FormsModule,
  ],
  exports: [UsaTextareaComponent],
})
export class UsaTextareaModule {}
