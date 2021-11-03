import { Component, TrackByFunction } from '@angular/core';
import { TableDataSource } from 'uswds-components';

@Component({
  selector: 'usa-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styles: [
  ]
})
export class DynamicTableComponent {

  displayedColumns = ['title', 'description', 'year', 'settings'];
  removedData = [];

  displyedData: TableDataSource[] = [
    {
      id: 1,
      title: 'Declaration of Independence', 
      description: 'Statement adopted by the Continental Congress declaring independence from the British Empire.', 
      year: 1776
    },
    {
      id: 2,
      title: 'Bill of Rights', 
      description: 'The first ten amendments of the U.S. Constitution guaranteeing rights and freedoms.', 
      year: 1791
    },
    {
      id: 3,
      title: 'Declaration of Sentiments', 
      description: 'A document written during the Seneca Falls Convention outlining the rights that American women should be entitled to as citizens.', 
      year: 1848
    },
    {
      id: 4,
      title: 'Emancipation Proclamation', 
      description: 'An executive order granting freedom to slaves in designated southern states.', 
      year: 1863
    },
  ];

  trackByFn: TrackByFunction<TableDataSource> = (index: number, item: TableDataSource) =>  {
    return item.id
  }

  addLastDataRow() {
    if (!this.removedData.length) {
      return;
    }

    const dataToAdd = this.removedData.pop();
    this.displyedData = [...this.displyedData, dataToAdd];
  }

  onRemoveRowClicked(year, index) {
    this.removedData.push(this.displyedData[index]);
    this.displyedData = this.displyedData.filter((item, dataIndex) => index != dataIndex);
  }
}
