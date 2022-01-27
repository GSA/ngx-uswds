import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  templateUrl: './input-basic.component.html',
  selector: `formly-input-basic`,
})
export class FormlyBasicInputComponent {
  @Input() characterCount: number = undefined;
  @Input() prefix: string = undefined;
  @Input() suffix: string = undefined;
  @Input() placeholder = 'Type Here...';
  @Input() label = 'Keyword Search';
  @Input() description = `For more information on how to use our keyword search, visit our <a href="#"> help guide </a>`;
  @Input() required = false

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'search',
      type: 'input',
      templateOptions: {
        placeholder: this.placeholder,
        label: this.label,
        description: this.description,
        required: this.required,
        characterCount: this.characterCount,
        prefix: this.prefix,
        suffix: this.suffix,
      },
    },];

}
