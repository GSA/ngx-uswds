import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsaSidenavModule } from '@gsa-sam/ngx-uswds';
import { SideNavigationStaticComponent } from './side-navigation-static.component';


@NgModule({
  imports: [
    CommonModule,
    UsaSidenavModule
  ],
  declarations: [
    SideNavigationStaticComponent
  ],
  exports: [
    SideNavigationStaticComponent
  ]
})
export class SideNavigationStaticModule { }
