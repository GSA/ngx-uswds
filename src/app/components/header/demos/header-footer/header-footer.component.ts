import { Component } from '@angular/core';
import { TableDataSource } from '@gsa-sam/ngx-uswds';

@Component({
  selector: 'usa-header-footer',
  templateUrl: './header-footer.component.html',
  styles: [
  ]
})
export class HeaderFooterComponent {
  columnHeaders = ['variable', 'description'];
  dataRows: TableDataSource = [
    {
      variable: '$theme-header-font-family ',
      description: 'Font family of the header.',
    },
    {
      variable: '$theme-header-logo-text-width',
      description: 'Width of the logo text area at desktop width as a percentage of the total header width.'
    },
    {
      variable: '$theme-header-max-width',
      description: 'Maximum width of the header.'
    },
    {
      variable: '$theme-header-min-width',
      description: 'Breakpoint at which the non-mobile header is shown.'
    },
  ]
}
