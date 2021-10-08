import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsaSearchModule } from 'uswds-components';
import { SearchCustomButtonTextComponent } from './search-custom-button-text.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SearchCustomButtonTextComponent],
  imports: [
    CommonModule,
    UsaSearchModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports: [SearchCustomButtonTextComponent]
})
export class SearchCustomButtonTextModule { }
