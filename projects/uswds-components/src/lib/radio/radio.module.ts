import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaRadioGroupComponent, UsaRadioGroupLabel } from "./radio-group.component";
import { UsaRadioComponent, UsaRadioLabelDescription } from "./radio.component";


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UsaRadioComponent,
    UsaRadioLabelDescription,
    UsaRadioGroupComponent,
    UsaRadioGroupLabel,
  ],
  exports: [
    UsaRadioComponent,
    UsaRadioLabelDescription,
    UsaRadioGroupComponent,
    UsaRadioGroupLabel,
  ]
})
export class UsaRadioModule {}