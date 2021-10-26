import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsaSidenavModule } from 'uswds-components';
import { SideNavigationToggleSingleComponent } from './side-navigation-toggle-single.component';


@NgModule({
  imports: [
    CommonModule,
    UsaSidenavModule
  ],
  declarations: [
    SideNavigationToggleSingleComponent
  ],
  exports: [
    SideNavigationToggleSingleComponent
  ]
})
export class SideNavigationToggleSingleModule { }
