import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'usa-datepicker-basic',
  templateUrl: './datepicker-basic.component.html',
})
export class DatepickerBasicComponent implements OnInit {

  min = new Date("2014-01-16"); 
  max = new Date("2023-02-16");  
  constructor() { }

  ngOnInit(): void {}

}
