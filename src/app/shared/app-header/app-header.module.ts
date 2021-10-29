import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UsaHeaderModule } from "uswds-components";
import { ThemeSwitcherModule } from "../theme-switcher/theme-switcher.module";
import { UsaAppHeaderComponent } from "./app-header.component";


@NgModule({
  imports: [
    CommonModule,
    ThemeSwitcherModule,
    UsaHeaderModule,
    RouterModule,
  ],
  declarations: [
    UsaAppHeaderComponent,
  ],
  exports: [
    UsaAppHeaderComponent,
  ]
})
export class UsaAppHeaderModule {}
