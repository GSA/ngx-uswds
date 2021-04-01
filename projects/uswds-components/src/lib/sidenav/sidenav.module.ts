import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { USWDSSidenavComponent } from "./sidenav.component";


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    USWDSSidenavComponent
  ],
  exports: [
    USWDSSidenavComponent
  ]
})
export class USWDSSidenavModule {}
