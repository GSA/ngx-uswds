import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaSidenavComponent } from "./sidenav.component";


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UsaSidenavComponent
  ],
  exports: [
    UsaSidenavComponent
  ]
})
export class UsaSidenavModule {}
