import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ThemeSwitcherModule } from "../theme-switcher/theme-switcher.module";
import { UsaAppHeaderComponent } from "./app-header.component";


@NgModule({
  imports: [
    CommonModule,
    ThemeSwitcherModule,
  ],
  declarations: [
    UsaAppHeaderComponent,
  ],
  exports: [
    UsaAppHeaderComponent,
  ]
})
export class UsaAppHeaderModule {}
