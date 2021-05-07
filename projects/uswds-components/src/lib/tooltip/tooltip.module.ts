import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaTooltipDirective } from './tooltip.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    UsaTooltipDirective
  ],
  exports: [
    UsaTooltipDirective
  ]
})
export class UsaTooltipModule {}
