import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsaSidenavModule } from 'uswds-components';
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
