import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ButtonGroupComponent } from "./button-group/button-group.component";
import { ButtonGroupModule } from "./button-group/button-group.module";
import { CheckboxComponent } from "./checkbox/checkbox.component";
import { CheckboxModule } from "./checkbox/checkbox.module";
import { DropdownComponent } from "./dropdown/dropdown.component";
import { DropdownModule } from "./dropdown/dropdown.module";
import { StepIndicatorComponent } from "./step-indicator/step-indicator.component";
import { StepIndicatorModule } from "./step-indicator/step-indicator.module";
import {AccordionModule, ROUTES as ACCORDION_ROUTES} from './accordion/accordion.module';
import { ModalModule,  ROUTES as MODAL_ROUTES } from "./modal/modal.module";
import { TableModule, ROUTES as TABLE_ROUTES } from './table/table.module';
import { TooltipModule, ROUTES as TOOLTIP_ROUTES } from './tooltip/tooltip.module';
import { FileInputModule, ROUTES as FILE_INPUT_ROUTES } from './file-input/file-input.module';
import { DatePickerModule, ROUTES as DATEPICKER_ROUTES } from "./datePicker/datePicker.module";
import { CharacterCountModule, ROUTES as CHARACTER_COUNT_ROUTES } from "./character-count/character-count.module";

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
    path: 'button-group',
    component: ButtonGroupComponent
  },
  {
    path: 'checkbox',
    component: CheckboxComponent
  },
  {
    path: 'dropdown',
    component: DropdownComponent
  },
  {
    path: 'file-input',
    children: FILE_INPUT_ROUTES,
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
  {
    path: 'datepicker',
    children: DATEPICKER_ROUTES,
  },
  {
    path: 'character-count',
    children: CHARACTER_COUNT_ROUTES,
  },
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    AccordionModule,
    ButtonGroupModule,
    CheckboxModule,
    DropdownModule,
    FileInputModule,
    StepIndicatorModule,
    ModalModule,
    TableModule,
    TooltipModule,
    DatePickerModule,
    CharacterCountModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {}
