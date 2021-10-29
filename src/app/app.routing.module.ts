import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormlyRoutingModule } from "./formly/formly.routing.module";
import { ComponentRoutingModule } from "./component.routing.module";

const routes: Routes = [

  {
    path: 'components',
    loadChildren: () => import('./component.routing.module').then(m => m.ComponentRoutingModule)
  },
  {
    path: 'formly',
    loadChildren: () => import('./formly/formly.routing.module').then(m => m.FormlyRoutingModule)
  }
]


@NgModule({
  imports: [
    CommonModule,
    FormlyRoutingModule,
    ComponentRoutingModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
