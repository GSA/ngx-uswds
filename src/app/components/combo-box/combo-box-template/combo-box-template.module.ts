import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UsaComboboxModule } from "@gsa-sam/ngx-uswds";
import { ComboBoxTemplateComponent } from "./combo-box-template.component";


@NgModule({
  imports: [
    CommonModule,
    UsaComboboxModule,
    FormsModule,
  ],
  declarations: [
    ComboBoxTemplateComponent
  ],
  exports: [
    ComboBoxTemplateComponent
  ]
})
export class ComboBoxTemplateModule {}
