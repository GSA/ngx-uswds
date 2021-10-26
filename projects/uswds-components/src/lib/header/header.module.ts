import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsaHeaderComponent } from './header.component';
import { UsaHeaderPrimaryContent } from 'uswds-components';


@NgModule({
  declarations: [
    UsaHeaderComponent,
    UsaHeaderPrimaryContent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UsaHeaderComponent,
    UsaHeaderPrimaryContent,
  ]
})
export class UsaHeaderModule { }
