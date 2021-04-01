import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'uswds-date-picker',
  templateUrl: './date-picker.component.html',
})
export class DatePickerComponent implements OnInit {

  @Input() id: string;
  @Input() label: string;
  @Input() hint?: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
