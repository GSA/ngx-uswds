import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderExtendedComponent } from './header-extended.component';
import { UsaHeaderModule, UsaSearchModule } from '@gsa-sam/ngx-uswds';


@NgModule({
  declarations: [HeaderExtendedComponent],
  imports: [
    CommonModule,
    UsaHeaderModule,
    UsaSearchModule,
  ],
  exports: [HeaderExtendedComponent]
})
export class HeaderExtendedModule { }
