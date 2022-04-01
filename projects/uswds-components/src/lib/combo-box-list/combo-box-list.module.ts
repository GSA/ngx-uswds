import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaComboBoxItemTemplate, UsaComboboxList } from "./combo-box-list.component";


@NgModule({
  imports: [ CommonModule ],
  declarations: [
    UsaComboboxList,
    UsaComboBoxItemTemplate
  ],
  exports: [
    UsaComboboxList,
    UsaComboBoxItemTemplate
  ]
})
export class UsaComboBoxListModule {}
