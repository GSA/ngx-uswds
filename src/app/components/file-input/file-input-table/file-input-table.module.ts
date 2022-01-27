import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaFileInputModule, UsaTableModule } from "@gsa-sam/ngx-uswds";
import { FileInputTableComponent } from "./file-input-table.component";


@NgModule({
  imports: [
    CommonModule,
    UsaFileInputModule,
    UsaTableModule
  ],
  declarations: [
    FileInputTableComponent
  ],
  exports: [
    FileInputTableComponent
  ]
})
export class FileInputTableModule {}
