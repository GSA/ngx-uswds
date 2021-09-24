import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search.component';
import { UsaSearchModule } from 'uswds-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'search' },
  {
    path: '',
    component: SearchComponent
  }
];

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    UsaSearchModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [RouterModule, SearchComponent]
})
export class SearchModule { }
