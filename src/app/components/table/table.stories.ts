import { CommonModule } from "@angular/common";
import { UsaTableComponent, UsaTableModule } from "@gsa-sam/ngx-uswds";
import { Meta, moduleMetadata } from "@storybook/angular";
import { generateConfig } from "src/sandbox/sandbox-utils";
import { DynamicTableModule } from "./dynamic-table/dynamic-table.module";
import { MultiHeaderModule } from "./multi-header/multi-header.module";
import { SortableTableModule } from "./sortable-table/sortable-table.module";
import { TableBasicModule } from "./table-basic/table-basic.module";
import { TableRowHoverModule } from "./table-row-hover/table-row-hover.module";
import { basicColumns, basicData } from "./table-static-data";
import { action } from '@storybook/addon-actions';

declare var require: any;

const actionsData = {
  rowClicked: action('Row Clicked'),
};

export default {
  title: 'Components/Table',
  component: UsaTableComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule, 
        UsaTableModule, 
        TableBasicModule,
        MultiHeaderModule,
        SortableTableModule,
        DynamicTableModule,
        TableRowHoverModule,
      ],
    }),
  ],
  args: {
    striped: false,
    borderless: true,
    compact: false,
    scrollable: false,
    stacked: false,
    stackedHeader: false,
    highlightRowOnHover: false,
    displayedColumns: basicColumns,
    displayedData: basicData,
  }
  
} as Meta;


const footer = require('!!raw-loader!./table-overview.html');

export const Overview = () => ({
  template: footer.default,
  props: {
    columnHeaders: ['variable', 'description'],
    dataRows: [
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
});
Overview.parameters = {options: {showPanel: false}};


const template = require('!!raw-loader!./table-basic/table-basic.component.html');

export const Basic = (args) => ({
  template: template.default,
  props: {
    rowClicked: actionsData.rowClicked,
    ...args,
  }
});

Basic.parameters = {
  preview: generateConfig('components/table/table-basic', 'TableBasicModule', 'table-basic')
};


/** -------------------------- Multi Header ---------------------------- */
export const MultiHeader = () => ({
  template: '<table-multi-header></table-multi-header>',
});

MultiHeader.parameters = {
  preview: generateConfig('components/table/multi-header', 'MultiHeaderModule', 'table-multi-header')
};


/** ------------ Sortable Table ------------------ */
export const Sortable = () => ({
  template: '<sortable-table></sortable-table>',
});

Sortable.parameters = {
  preview: generateConfig('components/table/sortable-table', 'SortableTableModule', 'sortable-table')
};


/**-------------- Dynamic Table -------------------------------- */
export const DynamicTable = () => ({
  template: '<dynamic-table></dynamic-table>',
});

DynamicTable.parameters = {
  preview: generateConfig('components/table/dynamic-table', 'DynamicTableModule', 'dynamic-table')
};


export const RowHover = () => ({
  template: '<usa-table-row-hover></usa-table-row-hover>',
});

RowHover.parameters = {
  preview: generateConfig('components/table/table-row-hover', 'TableRowHoverModule', 'usa-table-row-hover')
};
