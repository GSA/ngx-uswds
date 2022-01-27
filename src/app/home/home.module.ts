import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { RouterModule, Routes } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent,
    RouterModule,
  ]
})
export class HomeModule {}
