import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'usa-checkbox-forms',
  templateUrl: './checkbox-forms.component.html',
})
export class CheckboxFormsComponent {

  basicFormsModels = [
    {name: 'Sojourner Truth', checked: false},
    {name: 'Frederick Douglass', checked: false},
    {name: 'Booker T. Washington', checked: false},
    {name: 'George Washington Carver', checked: true},
  ];


  reactiveFormControls = [
    {name: 'Sojourner Truth', control: new FormControl(false)},
    {name: 'Frederick Douglass', control: new FormControl(false)},
    {name: 'Booker T. Washington', control: new FormControl(false)},
    {name: 'George Washington Carver', control: new FormControl(true)},
  ];
}
