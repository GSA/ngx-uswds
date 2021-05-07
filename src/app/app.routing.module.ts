import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AlertComponent } from "./alert/alert.component";
import { AlertModule } from "./alert/alert.module";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { BreadcrumbModule } from "./breadcrumb/breadcrumb.module";
import { ButtonGroupComponent } from "./button-group/button-group.component";
import { ButtonGroupModule } from "./button-group/button-group.module";
import { ButtonComponent } from "./button/button.component";
import { ButtonModule } from "./button/button.module";
import { CardComponent } from "./card/card.component";
import { CardModule } from "./card/card.module";
import { CheckboxComponent } from "./checkbox/checkbox.component";
import { CheckboxModule } from "./checkbox/checkbox.module";
import { DateInputComponent } from "./date-input/date-input.component";
import { DateInputModule } from "./date-input/date-input.module";
import { DropdownComponent } from "./dropdown/dropdown.component";
import { DropdownModule } from "./dropdown/dropdown.module";
import { FileInputComponent } from "./file-input/file-input.component";
import { FileInputModule } from "./file-input/file-input.module";
import { LinkComponent } from "./link/link.component";
import { LinkModule } from "./link/link.module";
import { ListComponent } from "./list/list.component";
import { ListModule } from "./list/list.module";
import { ProcessListComponent } from "./process-list/process-list.component";
import { ProcessListModule } from "./process-list/process-list.module";
import { StepIndicatorComponent } from "./step-indicator/step-indicator.component";
import { StepIndicatorModule } from "./step-indicator/step-indicator.module";
import {AccordionModule, ROUTES as ACCORDION_ROUTES} from './accordion/accordion.module';
import { ModalModule,  ROUTES as MODAL_ROUTES } from "./modal/modal.module";
import { TableModule, ROUTES as TABLE_ROUTES } from './table/table.module';
import { TooltipModule, ROUTES as TOOLTIP_ROUTES } from './tooltip/tooltip.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'accordion',
    pathMatch: 'full',
  },
  {
    path: 'accordion',
    children: ACCORDION_ROUTES
  },
  {
    path: 'alert',
    component: AlertComponent
  },
  {
    path: 'breadcrumb',
    component: BreadcrumbComponent
  },
  {
    path: 'button',
    component: ButtonComponent
  },
  {
    path: 'button-group',
    component: ButtonGroupComponent
  },
  {
    path: 'card',
    component: CardComponent
  },
  {
    path: 'checkbox',
    component: CheckboxComponent
  },
  {
    path: 'date-input',
    component: DateInputComponent
  },
  {
    path: 'dropdown',
    component: DropdownComponent
  },
  {
    path: 'file-input',
    component: FileInputComponent
  },
  {
    path: 'link',
    component: LinkComponent
  },
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'process-list',
    component: ProcessListComponent,
  },
  {
    path: 'step-indicator',
    component: StepIndicatorComponent,
  },
  {
    path: 'modal',
    children: MODAL_ROUTES,
  },
  {
    path: 'table',
    children: TABLE_ROUTES,
  },
  {
    path: 'tooltip',
    children: TOOLTIP_ROUTES
  },
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    AccordionModule,
    AlertModule,
    ButtonModule,
    ButtonGroupModule,
    CheckboxModule,
    DateInputModule,
    DropdownModule,
    FileInputModule,
    BreadcrumbModule,
    CardModule,
    LinkModule,
    ListModule,
    ProcessListModule,
    StepIndicatorModule,
    ModalModule,
    TableModule,
    TooltipModule
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {}
