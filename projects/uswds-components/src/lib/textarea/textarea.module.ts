import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsaTextareaComponent } from './textarea.component';
import { UsaCharacterCountModule } from '../character-count/character-count.module';



@NgModule({
  declarations: [UsaTextareaComponent],
  imports: [
    CommonModule,
    UsaCharacterCountModule
  ],
  exports: [UsaTextareaComponent]
})
export class UsaTextareaModule { }
