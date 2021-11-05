import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyModule } from "@ngx-formly/core";
import { UsaFormlyModule } from "@gsa-sam/uswds-formly";
import { FormlyBasicInputComponent } from "./input-basic.component";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    UsaFormlyModule
  ],
  declarations: [
    FormlyBasicInputComponent
  ],
  exports: [
    FormlyBasicInputComponent
  ]
})
export class FormlyBasicInputModule { }
