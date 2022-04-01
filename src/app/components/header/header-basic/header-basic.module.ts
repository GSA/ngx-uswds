import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBasicComponent } from './header-basic.component';
import { UsaHeaderModule, UsaSearchModule } from '@gsa-sam/ngx-uswds';


@NgModule({
  declarations: [HeaderBasicComponent],
  imports: [
    CommonModule,
    UsaHeaderModule,
    UsaSearchModule,
  ],
  exports: [HeaderBasicComponent]
})
export class HeaderBasicModule { }
