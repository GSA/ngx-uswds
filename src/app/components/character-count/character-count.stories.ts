import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaCharacterCountDirective, UsaCharacterCountModule } from "@gsa-sam/ngx-uswds";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CharacterCountBasic } from "./character-count-basic/character-count-basic.component";
import { ANGULAR_CODESANDBOX } from "src/app/shared/sandbox/angular-dependencies";


const characterCountTemplate = require('!!raw-loader!./character-count-basic/character-count-basic.component.html');
const characterCountBasicTs = require('!!raw-loader!./character-count-basic/character-count-basic.component.ts');
const characterCountBasicModule = require('!!raw-loader!./character-count-basic/character-count-basic.module.ts');

const characterCountFooter = require('!!raw-loader!./character-count-footer.component.html');

const sandboxConfig = {
  files: {
    'character-count-basic.component.ts': characterCountBasicTs.default,
    'character-count-basic.module.ts': characterCountBasicModule.default,
    'character-count-basic.component.html': characterCountTemplate.default
  },
  moduleName: 'CharacterCountBasicModule',
  selector: 'character-count-basic'
};

export default {
  title: 'Components/CharacterCount',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, UsaCharacterCountModule, ReactiveFormsModule],
      declarations: [CharacterCountBasic]
    })
  ],
  args: {
    usaCharacterCount: 25,
  },
  parameters: {
    preview: [
      {
        tab: "character-count-basic.component.ts",
        template: characterCountBasicTs.default,
        language: "ts",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
        tab: "character-count-template.html",
        template: characterCountTemplate.default,
        language: "markup",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
        tab: "character-count-basic.module.ts",
        template: characterCountBasicModule.default,
        language: "ts",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
    ],
  }
} as Meta;

const basicTemplate = (args) => ({
  template: `<character-count-basic [characterCount]="${args.usaCharacterCount}"></character-count-basic>`
})

export const Basic = basicTemplate.bind({});


const FormControlTemplate: Story<UsaCharacterCountDirective> = (args: any) => {

  const formControl = new FormControl();

  return {
    template: `
      <label for="formControlInput">Form Control Textarea</label>
      <textarea class="usa-textarea" type="textarea" id="formControlInput"
       [usaCharacterCount]="${args.usaCharacterCount}" [formControl]="formControl" rows="5"></textarea>`,
    props: {
      ...args,
      formControl: formControl,
    },
  }
};

export const FormControlCounter = FormControlTemplate.bind({});

export const Footer = (args) => ({
  template: characterCountFooter.default
});


