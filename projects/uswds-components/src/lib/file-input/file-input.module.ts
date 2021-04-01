import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { USWDSFileInputComponent } from './file-input.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    USWDSFileInputComponent,
  ],
  exports: [
    USWDSFileInputComponent
  ]
})
export class USWDSFileInputModule {}
