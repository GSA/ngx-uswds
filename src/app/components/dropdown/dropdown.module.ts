import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { USWDSDropdownModule } from "uswds-components";
import { DropdownComponent } from "./dropdown.component";


@NgModule({
  imports: [
    CommonModule,
    USWDSDropdownModule
  ],
  declarations: [
    DropdownComponent
  ],
  exports: [
    DropdownComponent
  ]
})
export class DropdownModule {}
