import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsaSearchModule } from '@gsa-sam/ngx-uswds';
import { SearchOptionalComponent } from './search-optional.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SearchOptionalComponent],
  imports: [
    CommonModule,
    UsaSearchModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports: [SearchOptionalComponent]
})
export class SearchOptionalModule { }
