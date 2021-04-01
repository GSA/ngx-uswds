import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { USWDSBreadcrumbModel } from './breadcrumb.model';

@Component({
  selector: 'uswds-breadcrumb',
  templateUrl: './breadcrumb.component.html',
})
export class USWDSBreadcrumbComponent {

  @Input() wrap = false;
  @Input() breadcrumbs: USWDSBreadcrumbModel[];
  @Input() ariaLabel: string;

  @Input() selectedBreadcrumb: USWDSBreadcrumbModel;

  @Output() breadcrumbClicked = new EventEmitter<USWDSBreadcrumbModel>();

  onBreadcrumbClicked(breadcrumb: USWDSBreadcrumbModel) {
    this.selectedBreadcrumb = breadcrumb;
    this.breadcrumbClicked.emit(breadcrumb);
  }
}
