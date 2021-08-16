import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { USWDSSidenavModule } from 'uswds-components';
import { SideNavigationComponent } from './side-navigation.component';


@NgModule({
  imports: [
    CommonModule,
    USWDSSidenavModule
  ],
  declarations: [
    SideNavigationComponent
  ],
  exports: [
    SideNavigationComponent
  ]
})
export class SideNavigationModule { }
