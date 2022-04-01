import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  UsaBreadcrumbComponent,
  UsaBreadcrumbLinkTemplate,
} from './breadcrumb.component';
import { UsaLinkTemplateModule } from '../shared/link-template/link-template.module';
// import { UsaBreadcrumbLinkTemplate } from './breadcrumb.component';

@NgModule({
  declarations: [UsaBreadcrumbComponent, UsaBreadcrumbLinkTemplate],
  imports: [CommonModule, UsaLinkTemplateModule],
  exports: [UsaBreadcrumbComponent, UsaBreadcrumbLinkTemplate],
})
export class UsaBreadcrumbModule {}
