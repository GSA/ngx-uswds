import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaTableModule } from "uswds-components";
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
export class RadioFooterModule {}
