import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbBasicComponent } from './breadcrumb-basic.component';
import { UsaBreadcrumbModule } from '@gsa-sam/ngx-uswds';



@NgModule({
  declarations: [
    BreadcrumbBasicComponent
  ],
  imports: [
    CommonModule,
    UsaBreadcrumbModule,
  ],
  exports: [
    BreadcrumbBasicComponent
  ]
})
export class BreadcrumbBasicModule { }
