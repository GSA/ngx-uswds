import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaCharacterCountDirective, UsaCharacterCountModule } from "@gsa-sam/ngx-uswds";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CharacterCountBasic } from "./character-count-basic/character-count-basic.component";
import { generateConfig } from "src/app/shared/sandbox/sandbox-utils";

const characterCountFooter = require('!!raw-loader!./character-count-footer.component.html');

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
} as Meta;

const basicTemplate = (args) => ({
  template: `<character-count-basic [characterCount]="${args.usaCharacterCount}"></character-count-basic>`
})

export const Basic = basicTemplate.bind({});
Basic.parameters = {
  preview: generateConfig('components/character-count/character-count-basic', 'CharacterCountBasicModule', 'character-count-basuc')
}

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


