import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaLinkTemplateModule } from "../shared/link-template/link-template.module";
import { UsaSidenavComponent } from "./sidenav.component";
import { DropdownUsaSidenavComponent } from "./dropdownsidenav.component";

@NgModule({
  imports: [
    CommonModule,
    UsaLinkTemplateModule
  ],
  declarations: [
    UsaSidenavComponent,
    DropdownUsaSidenavComponent
  ],
  exports: [
    UsaSidenavComponent,
    DropdownUsaSidenavComponent
  ]
})
export class UsaSidenavModule {}
