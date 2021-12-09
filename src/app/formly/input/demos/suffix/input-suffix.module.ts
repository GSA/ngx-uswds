import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyModule } from "@ngx-formly/core";
import { UsaFormlyModule } from "@gsa-sam/uswds-formly";
import { FormlySuffixInputComponent } from "./input-suffix.component";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    UsaFormlyModule
  ],
  declarations: [
    FormlySuffixInputComponent
  ],
  exports: [
    FormlySuffixInputComponent
  ]
})
export class FormlySuffixInputModule { }
