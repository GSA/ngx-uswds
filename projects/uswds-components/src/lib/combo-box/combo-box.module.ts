import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsaComboBoxComponent } from './combo-box.component';
import { UsaComboboxDropdown } from './combo-box-dropdown.component';
import { HoverClassModule } from '../util/hover-class';


@NgModule({
  declarations: [
    UsaComboBoxComponent,
    UsaComboboxDropdown
  ],
  imports: [
    CommonModule,
    HoverClassModule,
  ],
  exports: [
    UsaComboBoxComponent,
    UsaComboboxDropdown,
  ]
})
export class UsaComboboxModule { }
