import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsaComboBoxComponent } from './combo-box.component';
import { UsaComboBoxListModule } from '../combo-box-list/combo-box-list.module';

@NgModule({
  declarations: [UsaComboBoxComponent],
  imports: [CommonModule, UsaComboBoxListModule],
  exports: [UsaComboBoxComponent, UsaComboBoxListModule],
})
export class UsaComboboxModule {}
