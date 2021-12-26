import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputBasicComponent } from "./input-basic.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    InputBasicComponent
  ],
  exports: [
    InputBasicComponent
  ]
})
export class InputBasicModule { }
