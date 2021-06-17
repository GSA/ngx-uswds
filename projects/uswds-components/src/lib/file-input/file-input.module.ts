import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { USWDSFileInputComponent } from './file-input.component';
import { FileInputConfig } from "./file-input.config";
import { UsaFilePreviewDirective } from "./file-preview.directive";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    USWDSFileInputComponent,
    UsaFilePreviewDirective,
  ],
  exports: [
    USWDSFileInputComponent
  ],
  providers: [
    FileInputConfig
  ]
})
export class USWDSFileInputModule {}
