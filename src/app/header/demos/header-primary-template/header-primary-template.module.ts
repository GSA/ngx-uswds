import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderPrimaryTemplateComponent } from './header-primary-template.component';
import { UsaHeaderModule, UsaSearchModule } from 'uswds-components';



@NgModule({
  declarations: [HeaderPrimaryTemplateComponent],
  imports: [
    CommonModule,
    UsaHeaderModule,
    UsaSearchModule,
  ],
  exports: [HeaderPrimaryTemplateComponent]
})
export class HeaderPrimaryTemplateModule { }
