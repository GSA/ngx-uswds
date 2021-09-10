import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { USWDSSidenavModule } from 'uswds-components';
import { SideNavigationToggleSingleComponent } from './side-navigation-toggle-single.component';


@NgModule({
  imports: [
    CommonModule,
    USWDSSidenavModule
  ],
  declarations: [
    SideNavigationToggleSingleComponent
  ],
  exports: [
    SideNavigationToggleSingleComponent
  ]
})
export class SideNavigationToggleSingleModule { }
