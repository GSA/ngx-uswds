import { Component } from '@angular/core';
import { mockData } from "../combo-box-dummy-data";

@Component({
  selector: 'usa-combo-box-basic',
  templateUrl: './combo-box-basic.component.html',
})
export class ComboBoxBasicComponent {

  id = 'basicCombobox';
  disabled = false;
  readonly = false;
  virtualScroll = true;
  labelField = 'name';
  valueField = 'id';

  mockData = mockData;
}
