import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaTimePickerModule } from "@gsa-sam/ngx-uswds";
import { TimePickerBasicComponent } from "./time-picker-basic.component";


@NgModule({
  imports: [CommonModule, UsaTimePickerModule],
  declarations: [ TimePickerBasicComponent ],
  exports: [TimePickerBasicComponent]
})
export class TimePickerBasicModule {}
