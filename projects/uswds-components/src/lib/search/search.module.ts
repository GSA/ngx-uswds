import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsaSearchComponent } from './search.component';



@NgModule({
  declarations: [UsaSearchComponent],
  imports: [
    CommonModule
  ],
  exports: [UsaSearchComponent]
})
export class UsaSearchModule { }
