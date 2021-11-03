import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ButtonGroupComponent } from ".//button-group/button-group.component";
import { ButtonGroupModule } from ".//button-group/button-group.module";
import { CheckboxModule, ROUTES as CHECKBOX_ROUTES } from ".//checkbox/checkbox.module";
import { RadioModule, ROUTES as RADIO_ROUTES } from ".//radio/radio.module";
import { DropdownComponent } from ".//dropdown/dropdown.component";
import { DropdownModule } from ".//dropdown/dropdown.module";
import { StepIndicatorModule, ROUTES as STEP_INDICATOR_ROUTES } from ".//step-indicator/step-indicator.module";
import { AccordionModule, ROUTES as ACCORDION_ROUTES } from './/accordion/accordion.module';
import { ModalModule, ROUTES as MODAL_ROUTES } from ".//modal/modal.module";
import { TableModule, ROUTES as TABLE_ROUTES } from './/table/table.module';
import { TooltipModule, ROUTES as TOOLTIP_ROUTES } from './/tooltip/tooltip.module';
import { FileInputModule, ROUTES as FILE_INPUT_ROUTES } from './/file-input/file-input.module';
import { DatePickerModule, ROUTES as DATEPICKER_ROUTES } from ".//datepicker/datePicker.module";
import { CharacterCountModule, ROUTES as CHARACTER_COUNT_ROUTES } from ".//character-count/character-count.module";
import { SearchModule, ROUTES as SEARCH_ROUTES } from './/search/search.module';
import { HeaderModule, ROUTES as HEADER_ROUTES } from './header/header.module';
import { SideNavigationModule, ROUTES as SIDE_NAV_ROUTES } from ".//side-navigation/side-navigation.module";
import { ComponentHomeModule } from "./home/home.module";
import { ComponentsPageComponent } from "./components-page.component";
import { ComponentHome } from "./home/home.component";

const routes: Routes = [
  {
    path: '',
    component: ComponentsPageComponent,
    children: [
      {
        path: '',
        component: ComponentHome,
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
        children: CHECKBOX_ROUTES,
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
        children: STEP_INDICATOR_ROUTES,
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
        path: 'side-navigation',
        children: SIDE_NAV_ROUTES
      },
      {
        path: 'datepicker',
        children: DATEPICKER_ROUTES,
      },
      {
        path: 'character-count',
        children: CHARACTER_COUNT_ROUTES,
      },
      {
        path: 'radio',
        children: RADIO_ROUTES,
      },
      {
        path: 'search',
        children: SEARCH_ROUTES,
      },
      {
        path: 'header',
        children: HEADER_ROUTES,
      }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AccordionModule,
    ButtonGroupModule,
    CheckboxModule,
    DropdownModule,
    FileInputModule,
    StepIndicatorModule,
    ModalModule,
    TableModule,
    TooltipModule,
    SideNavigationModule,
    DatePickerModule,
    CharacterCountModule,
    RadioModule,
    SearchModule,
    HeaderModule,
    ComponentHomeModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class ComponentsRoutingModule { }
