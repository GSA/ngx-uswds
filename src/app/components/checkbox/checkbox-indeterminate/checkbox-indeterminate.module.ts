import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UsaCheckboxModule } from "@gsa-sam/ngx-uswds";
import { CheckboxIndeterminateComponent } from "./checkbox-indeterminate.component";


@NgModule({
  imports: [
    CommonModule,
    UsaCheckboxModule,
    FormsModule,
  ],
  declarations: [
    CheckboxIndeterminateComponent
  ],
  exports: [
    CheckboxIndeterminateComponent
  ]
})
export class CheckboxIndeterminateModule { }
