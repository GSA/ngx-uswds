import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb.component';
import { USWDSBreadcrumbModule } from 'uswds-components';


@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [
    CommonModule,
    USWDSBreadcrumbModule,
  ]
})
export class BreadcrumbModule { }
