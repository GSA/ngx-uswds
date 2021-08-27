import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@gsa-sam/ngx-uswds-icons';
import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { USWDSSidenavModule } from 'uswds-components';
import { SideNavigationToggleComponent } from './side-navigation-toggle.component';


@NgModule({
  imports: [
    CommonModule,
    USWDSSidenavModule,
    IconModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  declarations: [
    SideNavigationToggleComponent
  ],
  exports: [
    SideNavigationToggleComponent
  ]
})
export class SideNavigationToggleModule { }
