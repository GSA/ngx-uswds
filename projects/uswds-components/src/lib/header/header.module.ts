import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsaHeaderComponent } from './header.component';
import { 
  UsaHeaderPrimaryLinks, 
  UsaHeaderPrimaryExtra, 
  UsaHeaderSecondaryLinks, 
  UsaHeaderSecondaryExtra, 
  UsaHeaderPrimaryLinkTemplate, 
  UsaHeaderSecondaryLinkTemplate } from './header-selectors';
import { UsaHeaderSubmenuButton } from './header-submenu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UsaHeaderComponent,
    UsaHeaderPrimaryLinks,
    UsaHeaderSecondaryLinks,
    UsaHeaderSubmenuButton,
    UsaHeaderPrimaryExtra,
    UsaHeaderSecondaryExtra,
    UsaHeaderPrimaryLinkTemplate,
    UsaHeaderSecondaryLinkTemplate,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    UsaHeaderComponent,
    UsaHeaderPrimaryLinks,
    UsaHeaderSecondaryLinks,
    UsaHeaderSubmenuButton,
    UsaHeaderPrimaryExtra,
    UsaHeaderSecondaryExtra,
    UsaHeaderPrimaryLinkTemplate,
    UsaHeaderSecondaryLinkTemplate,
  ]
})
export class UsaHeaderModule { }
