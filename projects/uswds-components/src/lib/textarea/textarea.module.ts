import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsaTextareaComponent } from './textarea.component';
import { UsaCharacterCountModule } from '../character-count/character-count.module';
import { USWDSLabelWrapperModule } from '../label-wrapper/label-wrapper.module';

@NgModule({
  declarations: [UsaTextareaComponent],
  imports: [CommonModule, UsaCharacterCountModule, USWDSLabelWrapperModule],
  exports: [UsaTextareaComponent],
})
export class UsaTextareaModule {}
