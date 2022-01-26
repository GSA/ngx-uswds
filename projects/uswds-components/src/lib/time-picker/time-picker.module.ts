import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaComboboxModule } from "../combo-box/combo-box.module";
import { UsaTimePicker } from "./time-picker.component";

@NgModule({
  imports: [CommonModule, UsaComboboxModule],
  declarations: [UsaTimePicker],
  exports: [UsaTimePicker, UsaComboboxModule]
})
export class UsaTimePickerModule {}
