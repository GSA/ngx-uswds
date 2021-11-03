import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderExtendedTemplateComponent } from './header-extended-template.component';
import { UsaHeaderModule, UsaSearchModule } from 'uswds-components';


@NgModule({
  declarations: [HeaderExtendedTemplateComponent],
  imports: [
    CommonModule,
    UsaHeaderModule,
    UsaSearchModule,
  ],
  exports: [HeaderExtendedTemplateComponent]
})
export class HeaderExtendedTemplateModule { }
