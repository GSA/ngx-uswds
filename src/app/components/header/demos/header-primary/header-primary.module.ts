import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderPrimaryComponent } from './header-primary.component';
import { UsaHeaderModule, UsaSearchModule } from '@gsa-sam/ngx-uswds';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [HeaderPrimaryComponent],
  imports: [
    CommonModule,
    UsaHeaderModule,
    UsaSearchModule,
    RouterModule,
  ],
  exports: [HeaderPrimaryComponent]
})
export class HeaderPrimaryModule { }
