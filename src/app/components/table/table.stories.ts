import { CommonModule } from "@angular/common";
import { UsaTableComponent, UsaTableModule } from "@gsa-sam/ngx-uswds";
import { Meta, moduleMetadata } from "@storybook/angular";
import { ANGULAR_CODESANDBOX } from "src/app/shared/sandbox/angular-dependencies";
import { DynamicTableModule } from "./dynamic-table/dynamic-table.module";
import { MultiHeaderModule } from "./multi-header/multi-header.module";
import { SortableTableModule } from "./sortable-table/sortable-table.module";
import { TableBasicModule } from "./table-basic/table-basic.module";
import { basicColumns, basicData } from "./table-static-data";

declare var require: any;

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
      ],
    }),
  ],
  args: {
    displayedColumns: basicColumns,
    displayedData: basicData,
  }
  
} as Meta;


const componentTs = require('!!raw-loader!./table-basic/table-basic.component.ts');
const template = require('!!raw-loader!./table-basic/table-basic.component.html');
const moduleTs = require('!!raw-loader!./table-basic/table-basic.module.ts');

const sandboxConfig = {
  files: {
    'table-basic.component.ts': componentTs.default,
    'table-basic.component.html': template.default,
    'table-basic.module.ts': moduleTs.default,
  },
  moduleName: 'TableBasicModule',
  selector: 'table-basic'
};


export const Basic = (args) => ({
  template: `
  <table-basic
    [displayedColumns]="displayedColumns"
    [displayedData]="displayedData" 
    [borderless]="borderless" 
    [striped]="striped"
    [compact]="compact"
    [scrollable]="scrollable"
    [stacked]="stacked"
    [stackedHeader]="stackedHeader">
  </table-basic>`,
  props: args
});

Basic.parameters = {
  preview: [
    {
      tab: "table-basic.component.ts",
      template: componentTs.default,
      language: "ts",
      copy: true,
      codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
    },
    {
        tab: "table-basic.component.html",
        template: template.default,
        language: "html",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
    },
    {
      tab: "table-basic.module.ts",
      template: moduleTs.default,
      language: "ts",
      copy: true,
      codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
    },
  ],
};


/** -------------------------- Multi Header ---------------------------- */
const multiHeadercomponentTs = require('!!raw-loader!./multi-header/multi-header.component.ts');
const multiHeaderTemplate = require('!!raw-loader!./multi-header/multi-header.component.html');
const multiHeaderModuleTs = require('!!raw-loader!./multi-header/multi-header.module.ts');

const multiHeaderSandboxConfig = {
  files: {
    'multi-header.component.ts': multiHeadercomponentTs.default,
    'multi-header.component.html': multiHeaderTemplate.default,
    'multi-header.module.ts': multiHeaderModuleTs.default,
  },
  moduleName: 'MultiHeaderModule',
  selector: 'table-multi-header'
};

export const MultiHeader = () => ({
  template: '<table-multi-header></table-multi-header>',
});

MultiHeader.parameters = {
  preview: [
    {
      tab: "table-basic.component.ts",
      template: multiHeadercomponentTs.default,
      language: "ts",
      copy: true,
      codesandbox: ANGULAR_CODESANDBOX(multiHeaderSandboxConfig.files, multiHeaderSandboxConfig.moduleName, multiHeaderSandboxConfig.selector),
    },
    {
        tab: "table-basic.component.html",
        template: multiHeaderTemplate.default,
        language: "html",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(multiHeaderSandboxConfig.files, multiHeaderSandboxConfig.moduleName, multiHeaderSandboxConfig.selector),
    },
    {
      tab: "table-basic.module.ts",
      template: multiHeaderModuleTs.default,
      language: "ts",
      copy: true,
      codesandbox: ANGULAR_CODESANDBOX(multiHeaderSandboxConfig.files, multiHeaderSandboxConfig.moduleName, multiHeaderSandboxConfig.selector),
    },
  ],
};


/** ------------ Sortable Table ------------------ */
const sortableComponentTs = require('!!raw-loader!./sortable-table/sortable-table.component.ts');
const sortableTemplate = require('!!raw-loader!./sortable-table/sortable-table.component.html');
const sortableModuleTs = require('!!raw-loader!./sortable-table/sortable-table.module.ts');

const sortableSandboxConfig = {
  files: {
    'sortable-table.component.ts': sortableComponentTs.default,
    'sortable-table.component.html': sortableTemplate.default,
    'sortable-table.module.ts': sortableModuleTs.default,
  },
  moduleName: 'SortableTableModule',
  selector: 'sortable-table'
};

export const Sortable = () => ({
  template: '<sortable-table></sortable-table>',
});

Sortable.parameters = {
  preview: [
    {
      tab: "sortable-table.component.ts",
      template: sortableComponentTs.default,
      language: "ts",
      copy: true,
      codesandbox: ANGULAR_CODESANDBOX(sortableSandboxConfig.files, sortableSandboxConfig.moduleName, sortableSandboxConfig.selector),
    },
    {
        tab: "sortable-table.component.html",
        template: sortableTemplate.default,
        language: "html",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sortableSandboxConfig.files, sortableSandboxConfig.moduleName, sortableSandboxConfig.selector),
    },
    {
      tab: "sortable-table.module.ts",
      template: sortableModuleTs.default,
      language: "ts",
      copy: true,
      codesandbox: ANGULAR_CODESANDBOX(sortableSandboxConfig.files, sortableSandboxConfig.moduleName, sortableSandboxConfig.selector),
    },
  ],
};

/**-------------- Dynamic Table -------------------------------- */
const dynamicComponentTs = require('!!raw-loader!./dynamic-table/dynamic-table.component.ts');
const dynamicTemplate = require('!!raw-loader!./dynamic-table/dynamic-table.component.html');
const dynamicModuleTs = require('!!raw-loader!./dynamic-table/dynamic-table.module.ts');

const dynamicSandboxConfig = {
  files: {
    'dynamic-table.component.ts': dynamicComponentTs.default,
    'dynamic-table.component.html': dynamicTemplate.default,
    'dynamic-table.module.ts': dynamicModuleTs.default,
  },
  moduleName: 'DynamicTableModule',
  selector: 'dynamic-table'
};

export const DynamicTable = () => ({
  template: '<dynamic-table></dynamic-table>',
});

DynamicTable.parameters = {
  preview: [
    {
      tab: "dynamic-table.component.ts",
      template: dynamicComponentTs.default,
      language: "ts",
      copy: true,
      codesandbox: ANGULAR_CODESANDBOX(dynamicSandboxConfig.files, dynamicSandboxConfig.moduleName, dynamicSandboxConfig.selector),
    },
    {
        tab: "dynamic-table.component.html",
        template: dynamicTemplate.default,
        language: "html",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(dynamicSandboxConfig.files, dynamicSandboxConfig.moduleName, dynamicSandboxConfig.selector),
    },
    {
      tab: "dynamic-table.module.ts",
      template: dynamicModuleTs.default,
      language: "ts",
      copy: true,
      codesandbox: ANGULAR_CODESANDBOX(dynamicSandboxConfig.files, dynamicSandboxConfig.moduleName, dynamicSandboxConfig.selector),
    },
  ],
};

const footer = require('!!raw-loader!./table-footer.template.html');

export const Footer = () => ({
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
