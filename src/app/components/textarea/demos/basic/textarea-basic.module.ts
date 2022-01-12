import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UsaTextareaModule } from "@gsa-sam/ngx-uswds";
import { TextareaBasicComponent } from "./textarea-basic.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsaTextareaModule
  ],
  declarations: [
    TextareaBasicComponent
  ],
  exports: [
    TextareaBasicComponent
  ]
})
export class TextareaBasicModule { }
