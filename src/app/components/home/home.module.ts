import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ComponentHome } from "./home.component";


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ComponentHome,
  ],
  exports: [
    ComponentHome
  ]
})
export class ComponentHomeModule {}