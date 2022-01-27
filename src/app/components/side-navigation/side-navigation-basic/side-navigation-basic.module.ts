import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsaSidenavModule } from '@gsa-sam/ngx-uswds';
import { SideNavigationBasicComponent } from './side-navigation-basic.component';


@NgModule({
  imports: [
    CommonModule,
    UsaSidenavModule,
  ],
  declarations: [
    SideNavigationBasicComponent
  ],
  exports: [
    SideNavigationBasicComponent
  ]
})
export class SideNavigationBasicModule { }
