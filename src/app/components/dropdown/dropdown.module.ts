import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { USWDSDropdownModule } from "@gsa-sam/ngx-uswds";
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
export class DropdownModule { }
