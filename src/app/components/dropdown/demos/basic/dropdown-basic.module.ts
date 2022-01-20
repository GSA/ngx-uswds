import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaDropdownModule } from "@gsa-sam/ngx-uswds";
import { DropdownBasicComponent } from "./dropdown-basic.component";


@NgModule({
  imports: [
    CommonModule,
    UsaDropdownModule
  ],
  declarations: [
    DropdownBasicComponent
  ],
  exports: [
    DropdownBasicComponent
  ]
})
export class DropdownBasicModule { }
