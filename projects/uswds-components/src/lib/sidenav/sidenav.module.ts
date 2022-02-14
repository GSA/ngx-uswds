import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaLinkTemplateModule } from "../shared/link-template/link-template.module";
import { UsaSidenavComponent } from "./sidenav.component";


@NgModule({
  imports: [
    CommonModule,
    UsaLinkTemplateModule
  ],
  declarations: [
    UsaSidenavComponent
  ],
  exports: [
    UsaSidenavComponent
  ]
})
export class UsaSidenavModule {}
