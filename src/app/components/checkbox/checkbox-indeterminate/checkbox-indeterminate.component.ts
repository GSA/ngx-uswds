import { Component } from "@angular/core";

@Component({
  selector: 'checkbox-indeterminate',
  templateUrl: './checkbox-indeterminate.component.html'
})
export class CheckboxIndeterminateComponent {
  allChecked =  false;

  values =  [
    {name: 'Sojourner Truth', checked: false},
    {name: 'Frederick Douglass', checked: false},
    {name: 'Booker T. Washington', checked: false},
    {name: 'George Washington Carver', checked: false},
  ];

  checkIndeterminate() {
    const checkedValues = this.values.filter(value => value.checked)
    return checkedValues.length > 0 && checkedValues.length < 4;
  }

  onChange($event: boolean, changedValue: {name: string, checked: boolean}) {
    if (!changedValue) return;
    this.values.find(value => value.name === changedValue.name).checked = $event;

    const checkedValues = this.values.filter(value => value.checked);
    this.allChecked = checkedValues.length === 4;
  }

  checkAll($event: boolean) {
    this.values.forEach(value => value.checked = $event);
  }
}