import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UsaLinkTemplateComponent } from "./link-template.component";


@NgModule({
  declarations: [
    UsaLinkTemplateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    UsaLinkTemplateComponent
  ]
})
export class UsaLinkTemplateModule {}
