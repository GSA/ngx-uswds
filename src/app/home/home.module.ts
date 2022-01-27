import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { RouterModule, Routes } from '@angular/router';
import { UsaTimePickerModule } from "@gsa-sam/ngx-uswds";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UsaTimePickerModule,
  ],
  exports: [
    HomeComponent,
    RouterModule,
  ]
})
export class HomeModule {}
