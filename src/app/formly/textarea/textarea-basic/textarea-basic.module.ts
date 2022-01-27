import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyModule } from "@ngx-formly/core";
import { UsaFormlyModule } from "@gsa-sam/uswds-formly";
import { FormlyTextareaBasicComponent } from "./textarea-basic.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    UsaFormlyModule
  ],
  declarations: [
    FormlyTextareaBasicComponent
  ],
  exports: [
    FormlyTextareaBasicComponent
  ]
})
export class FormlyBasicTextareaModule { }
