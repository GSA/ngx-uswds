import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaTooltipModule } from '@gsa-sam/ngx-uswds';
import { TooltipBasicComponent } from './tooltip-basic.component';

@NgModule({
  imports: [
    CommonModule,
    UsaTooltipModule,
  ],
  declarations: [
    TooltipBasicComponent,
  ],
  exports: [
    TooltipBasicComponent
  ]
})
export class TooltipBasicModule {}
