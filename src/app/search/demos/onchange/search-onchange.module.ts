import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsaSearchModule } from 'uswds-components';
import { SearchOnChangeComponent } from './search-onchange.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SearchOnChangeComponent],
  imports: [
    CommonModule,
    UsaSearchModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports: [SearchOnChangeComponent]
})
export class SearchOnChangeModule { }
