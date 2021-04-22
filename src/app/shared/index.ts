import { NgModule } from '@angular/core';
import { DocumentationExamplesPage } from './examples-page/examples.component';
import { DocumentationWidgetDemoComponent } from './examples-page/demo.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DemoWrapperComponent } from './demo-wrapper.component';
import { UsaAccordionModule, USWDSCardModule } from 'uswds-components';
import { HighlightModule } from 'ngx-highlightjs';

export * from './demo-list';

@NgModule({
  imports: [ 
    CommonModule, 
    RouterModule,
    USWDSCardModule,
    UsaAccordionModule,
    HighlightModule
  ],
  declarations: [
    DocumentationExamplesPage, 
    DocumentationWidgetDemoComponent,
    DemoWrapperComponent,
  ],
  exports: [
    DocumentationExamplesPage, DocumentationWidgetDemoComponent, DemoWrapperComponent
  ]
})
export class DocumentationComponentsSharedModule {

}
