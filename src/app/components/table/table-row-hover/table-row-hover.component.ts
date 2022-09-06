import { Component } from '@angular/core';
import { TableDataSource } from '@gsa-sam/ngx-uswds';

@Component({
  selector: 'usa-table-row-hover',
  templateUrl: './table-row-hover.component.html',
  styles: [],
})
export class TableRowHoverComponent {
  displayedColumns = ['title', 'description', 'year'];
  displayedData: TableDataSource[] = [
    {
      description:
        'Statement adopted by the Continental Congress declaring independence from the British Empire.',
      title: 'Declaration of Independence',
      year: 1776,
    },
    {
      title: 'Bill of Rights',
      description:
        'The first ten amendments of the U.S. Constitution guaranteeing rights and freedoms.',
      year: 1791,
    },
    {
      title: 'Declaration of Sentiments',
      description:
        'A document written during the Seneca Falls Convention outlining the rights that American women should be entitled to as citizens.',
      year: 1848,
    },
    {
      title: 'Emancipation Proclamation',
      description:
        'An executive order granting freedom to slaves in designated southern states.',
      year: 1863,
    },
  ];
}
