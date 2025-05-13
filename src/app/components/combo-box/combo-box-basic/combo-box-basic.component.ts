import { Component, Input } from '@angular/core';
import { mockData } from "../combo-box-dummy-data";

@Component({
  selector: 'usa-combo-box-basic',
  templateUrl: './combo-box-basic.component.html',
})
export class ComboBoxBasicComponent {

  @Input() id = 'basicCombobox';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() virtualScroll = true;
  @Input() labelField = 'name';
  @Input() valueField = 'id';

  @Input() mockData;
  constructor() {

  }
}
