import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaTooltipModule } from 'projects/uswds-components/src/lib/tooltip/tooltip.module';
import { USWDSCardModule} from "uswds-components";
import { TooltipComponent } from './tooltip.component';

@NgModule({
  imports: [
    CommonModule,
    UsaTooltipModule,
    USWDSCardModule,
  ],
  declarations: [
    TooltipComponent
  ],
  exports: [
    TooltipComponent
  ]
})
export class TooltipModule {}
