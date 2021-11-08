import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsaSidenavModule } from '@gsa-sam/ngx-uswds';
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
