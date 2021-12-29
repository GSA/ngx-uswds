import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaTableModule } from "@gsa-sam/ngx-uswds";
import { RadioFooterComponent } from "./radio-footer.component";


@NgModule({
  imports: [
    CommonModule,
    UsaTableModule,
  ],
  declarations: [
    RadioFooterComponent
  ],
  exports: [
    RadioFooterComponent
  ]
})
export class RadioFooterModule { }
