import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'components',
    loadChildren: () => import('./components/components-page.module').then(m => m.ComponentsPageModule),
  },
  {
    path: 'formly',
    loadChildren: () => import('./formly/formly.module').then(m => m.FormlyModule)
  }
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
