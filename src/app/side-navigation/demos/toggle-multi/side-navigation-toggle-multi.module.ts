import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { USWDSSidenavModule } from 'uswds-components';
import { SideNavigationToggleMultiComponent } from './side-navigation-toggle-multi.component';


@NgModule({
  imports: [
    CommonModule,
    USWDSSidenavModule,
  ],
  declarations: [
    SideNavigationToggleMultiComponent
  ],
  exports: [
    SideNavigationToggleMultiComponent
  ]
})
export class SideNavigationToggleMultiModule { }
