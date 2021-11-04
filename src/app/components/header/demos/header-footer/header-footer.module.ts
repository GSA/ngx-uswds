import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderFooterComponent } from './header-footer.component';
import { UsaTableModule } from 'uswds-components';



@NgModule({
  declarations: [HeaderFooterComponent],
  imports: [
    CommonModule,
    UsaTableModule,
  ],
  exports: [HeaderFooterComponent]
})
export class HeaderFooterModule { }
