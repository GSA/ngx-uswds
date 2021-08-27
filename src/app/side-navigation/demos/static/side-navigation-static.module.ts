import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@gsa-sam/ngx-uswds-icons';
import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { USWDSSidenavModule } from 'uswds-components';
import { SideNavigationStaticComponent } from './side-navigation-static.component';


@NgModule({
  imports: [
    CommonModule,
    USWDSSidenavModule,
    IconModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  declarations: [
    SideNavigationStaticComponent
  ],
  exports: [
    SideNavigationStaticComponent
  ]
})
export class SideNavigationStaticModule { }
