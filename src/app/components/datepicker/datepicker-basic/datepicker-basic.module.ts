import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaDatePickerContent, UsaDatePickerModule } from "@gsa-sam/ngx-uswds";
import { DatepickerBasicComponent } from "./datepicker-basic.component";


@NgModule({
  imports: [ CommonModule, UsaDatePickerModule],
  declarations: [ DatepickerBasicComponent ],
  exports: [ DatepickerBasicComponent ],
  // Entry components not needed for Ivy
  entryComponents: [UsaDatePickerContent]
})
export class DatepickerBasicModule {}
