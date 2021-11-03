import { Component, OnInit } from '@angular/core';
import { TableDataSource } from 'uswds-components';

@Component({
  selector: 'usa-table-footer',
  templateUrl: './table-footer.component.html',
  styles: [
  ]
})
export class TableFooterComponent {
  columnHeaders = ['variable', 'description'];
  dataRows: TableDataSource= [
    {
      variable: '$theme-table-border-color', 
      description: 'Defines a border color for table cells. A value of default uses either the default text or reverse text color depending on the site background color.'
    },
    {
      variable: '$theme-table-text-color', 
      description: 'Defines a text color for table cells. A value of default uses either the default text or reverse text color depending on the site background color.'
    },
    {
      variable: '$theme-table-header-background-color', 
      description: 'Defines a background color for header cells.'
    },
    {
      variable: '$theme-table-header-text-color ', 
      description: 'Defines a text color for header cells. A value of default uses either the default text or reverse text color depending on the header background color.'
    },
    {
      variable: '$theme-table-stripe-background-color', 
      description: 'Defines a background color for alternating horizontal stripes in the striped table variant.'
    },
    {
      variable: '$theme-table-stripe-text-color', 
      description: 'Defines a text color for alternating horizontal stripes in the striped table variant. A value of default uses either the default text or reverse text color depending on the stripe background color.'
    },
    {
      variable: '$theme-table-sorted-header-background-color', 
      description: 'Defines a background color for the sorted column header'
    },
    {
      variable: '$theme-table-sorted-background-color', 
      description: 'Defines a background color for the cells of the sorted column'
    },
    {
      variable: '$theme-table-sorted-stripe-background-color', 
      description: 'Defines a background color for the alternating horizontal stripes applied to cells of the sorted column'
    },
    {
      variable: '$theme-table-sorted-icon-color', 
      description: 'Defines a fill color for the activated sort button in a sortable column header. A value of default uses either the default text or reverse text color depending on the sorted column header background color.'
    },
    {
      variable: '$theme-table-unsorted-icon-color', 
      description: 'Defines a fill color for the unactivated sort button in a sortable column header'
    },
  ]
}
