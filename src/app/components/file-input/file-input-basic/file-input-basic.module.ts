import { NgModule } from "@angular/core";
import { UsaFileInputModule } from "@gsa-sam/ngx-uswds";
import { FileInputBasicComponent } from "./file-input-basic.component";


@NgModule({
  imports: [
    UsaFileInputModule
  ],
  declarations: [
    FileInputBasicComponent
  ],
  exports: [
    FileInputBasicComponent
  ]
})
export class FileInputBasicModule {}
