import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UsaSidenavComponent } from "./sidenav.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    UsaSidenavComponent
  ],
  exports: [
    UsaSidenavComponent
  ]
})
export class UsaSidenavModule {}
