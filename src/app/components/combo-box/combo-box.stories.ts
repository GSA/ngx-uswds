import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { UsaComboBoxComponent, UsaComboboxList, UsaComboboxModule } from "@gsa-sam/ngx-uswds";
import { ComboBoxBasicModule } from "./combo-box-basic/combo-box-basic.module";
import { ComboBoxBasicComponent } from "./combo-box-basic/combo-box-basic.component";
import { generateConfig } from "src/app/shared/sandbox/sandbox-utils";
import { ComboBoxTemplateModule } from "./combo-box-template/combo-box-template.module";

export default {
  title: 'Components/ComboBox',
  component: UsaComboBoxComponent,
  subcomponents: {
    'UsaComboBoxList': UsaComboboxList
  },
  decorators: [
    moduleMetadata({
      imports: [UsaComboboxModule, ComboBoxBasicModule, ComboBoxTemplateModule],
    }),
  ],
} as Meta;

const mockService = require('!!raw-loader!./combo-box-dummy-service.ts');
const dummyData = require('!!raw-loader!./combo-box-dummy-data.ts');

const basicTemplate: Story<ComboBoxBasicComponent> = (args: ComboBoxBasicComponent) => ({
  component: ComboBoxBasicComponent,
  props: args,
});

export const Basic = basicTemplate.bind({});
Basic.parameters = {
  preview: [
    ...generateConfig('components/combo-box/combo-box-basic', 'ComboBoxBasicModule', 'combo-box-basic'),
    {
      tab: 'combo-box-dummy-data.ts',
      template: dummyData.default,
      language: 'ts',
      copy: true,
    },
  ]
};

export const CustomTemplate = (args) => ({
  template: `<combo-box-template></combo-box-template>`,
});

CustomTemplate.parameters = {
  preview: [
    ...generateConfig('components/combo-box/combo-box-template', 'ComboBoxTemplateModule', 'combo-box-template'),
    {
      tab: 'combo-box-mock.service.ts',
      template: mockService.default,
      language: 'ts',
      copy: true,
    },
    {
      tab: 'combo-box-dummy-data.ts',
      template: dummyData.default,
      language: 'ts',
      copy: true,
    },
  ],
  options: { 
    showPanel: false 
  }
};