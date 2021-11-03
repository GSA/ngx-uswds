import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UsaSidenavModule, USWDSCardModule } from "uswds-components";
import { ComponentsPageComponent } from "./components-page.component";
import { ComponentsRoutingModule } from "./components-page.routing.module";


@NgModule({
  imports: [
    CommonModule,
    UsaSidenavModule,
    USWDSCardModule,
    ComponentsRoutingModule,
    RouterModule,
  ],
  declarations: [
    ComponentsPageComponent,
  ],
  exports: [
    ComponentsRoutingModule,
  ]
})
export class ComponentsPageModule {}
