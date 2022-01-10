import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsaComboBoxComponent } from './combo-box.component';
import { UsaComboboxDropdown } from './combo-box-dropdown.component';
import { HoverClassModule } from '../util/hover-class';
import { UsaComboBoxItemTemplate } from './combo-box-selectors';


@NgModule({
  declarations: [
    UsaComboBoxComponent,
    UsaComboBoxItemTemplate,
    UsaComboboxDropdown
  ],
  imports: [
    CommonModule,
    HoverClassModule,
  ],
  exports: [
    UsaComboBoxComponent,
    UsaComboboxDropdown,
    UsaComboBoxItemTemplate
  ]
})
export class UsaComboboxModule { }
