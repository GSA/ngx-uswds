import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsaInputAffixDirective } from './affix.directive';



@NgModule({
  declarations: [
    UsaInputAffixDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    UsaInputAffixDirective
  ]
})
export class UsaAffixModule { }
