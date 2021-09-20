import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'usa-character-count-basic',
  templateUrl: './character-count-basic.component.html',
})
export class CharacterCountBasicComponent {

  /** 
   * The character counter directive looks for form control to grab value if provided. 
   * Thus it can be placed in any component compatible with angular form so long as a 
   * form control value is passed in as input to the component
   */
  formControl = new FormControl();
}
