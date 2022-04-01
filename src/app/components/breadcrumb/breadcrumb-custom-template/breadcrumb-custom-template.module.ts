import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbCustomTemplateComponent } from './breadcrumb-custom-template.component';
import { UsaBreadcrumbModule } from '@gsa-sam/ngx-uswds';



@NgModule({
  declarations: [
    BreadcrumbCustomTemplateComponent
  ],
  imports: [
    CommonModule,
    UsaBreadcrumbModule,
  ],
  exports: [
    BreadcrumbCustomTemplateComponent
  ]
})
export class BreadcrumbCustomTemplateModule { }
