import { NgModule } from '@angular/core';
import { USWDSSearchComponent } from './search.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule,],
  exports: [USWDSSearchComponent],
  declarations: [USWDSSearchComponent],
  providers: [],
})
export class USWDSSearchModule { }
