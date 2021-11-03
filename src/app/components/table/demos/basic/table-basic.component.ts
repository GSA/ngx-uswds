import { Component } from '@angular/core';
import { TableDataSource } from 'uswds-components';

@Component({
  selector: 'usa-table-basic',
  templateUrl: './table-basic.component.html',
})
export class TableBasicComponent {
  displayedColumns = ['title', 'description', 'year'];
  displyedData: TableDataSource[] = [
    {
      description: 'Statement adopted by the Continental Congress declaring independence from the British Empire.', 
      title: 'Declaration of Independence', 
      year: 1776
    },
    {
      title: 'Bill of Rights', 
      description: 'The first ten amendments of the U.S. Constitution guaranteeing rights and freedoms.', 
      year: 1791
    },
    {
      title: 'Declaration of Sentiments', 
      description: 'A document written during the Seneca Falls Convention outlining the rights that American women should be entitled to as citizens.', 
      year: 1848
    },
    {
      title: 'Emancipation Proclamation', 
      description: 'An executive order granting freedom to slaves in designated southern states.', 
      year: 1863
    },
  ];

  striped: boolean = false;
  borderless: boolean = true;
  compact: boolean = false;
  scrollable: boolean = false;
  stacked: boolean = false;
  stackedHeader: boolean = false;
}
