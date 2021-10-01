import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ThemeSwitcherService } from "./theme-switcher.service";
import { ThemeSwitcherComponent } from "./theme-switcher.component";


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ThemeSwitcherComponent
  ],
  providers: [
    ThemeSwitcherService
  ],
  exports: [
    ThemeSwitcherComponent,
  ]
})
export class ThemeSwitcherModule {}
