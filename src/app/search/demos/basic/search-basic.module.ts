import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBasicComponent } from './search-basic.component';
import { ReactiveFormsModule } from '@angular/forms';
import { USWDSSearchModule } from 'uswds-components';



@NgModule({
  declarations: [SearchBasicComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    USWDSSearchModule
  ],
  exports: [SearchBasicComponent]
})
export class SearchBasicModule { }
