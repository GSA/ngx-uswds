import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsaCharacterCountDirective } from './character-count.directive';



@NgModule({
  declarations: [UsaCharacterCountDirective],
  imports: [
    CommonModule
  ],
  exports: [
    UsaCharacterCountDirective,
  ]
})
export class UsaCharacterCountModule { }
