import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsaSearchModule } from '@gsa-sam/ngx-uswds';
import { SearchBasicComponent } from './search-basic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SearchBasicComponent],
  imports: [
    CommonModule,
    UsaSearchModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports: [SearchBasicComponent]
})
export class SearchBasicModule { }
