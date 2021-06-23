import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { UsaFileInputComponent } from './file-input.component';
import { FileInputConfig } from "./file-input.config";
import { UsaFilePreviewDirective } from "./file-preview.directive";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    UsaFileInputComponent,
    UsaFilePreviewDirective,
  ],
  exports: [
    UsaFileInputComponent
  ],
  providers: [
    FileInputConfig
  ]
})
export class UsaFileInputModule {}
