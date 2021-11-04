import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyModule } from "@ngx-formly/core";
import { UsaFormlyModule } from "uswds-formly";
import { FormlyHomeBasicComponent } from "./home-basic.component";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    UsaFormlyModule
  ],
  declarations: [
    FormlyHomeBasicComponent
  ],
  exports: [
    FormlyHomeBasicComponent
  ]
})
export class FormlyHomeBasicModule { }
