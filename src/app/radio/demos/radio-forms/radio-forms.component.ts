import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'usa-radio-forms',
  templateUrl: './radio-forms.component.html',
  styles: [
  ]
})
export class RadioFormsComponent {


  templateModel: string = 'sojourner-truth';

  reactiveFormControl = new FormControl('frederick-douglass');

  onTemplateFormsModelChange(change) {
    this.templateModel = change;
  }
}
