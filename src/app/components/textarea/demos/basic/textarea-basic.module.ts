import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TextareaBasicComponent } from "./textarea-basic.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TextareaBasicComponent
  ],
  exports: [
    TextareaBasicComponent
  ]
})
export class TextareaBasicModule { }
