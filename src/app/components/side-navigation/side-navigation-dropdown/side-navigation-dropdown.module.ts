import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsaSidenavModule } from '@gsa-sam/ngx-uswds';
import { SideNavigationDropdownComponent } from './side-navigation-dropdown.component';


@NgModule({
  imports: [
    CommonModule,
    UsaSidenavModule,
  ],
  declarations: [
    SideNavigationDropdownComponent
  ],
  exports: [
    SideNavigationDropdownComponent
  ]
})
export class SideNavigationDropdownModule { }
