import { Component } from '@angular/core';
import { TableDataSource } from 'uswds-components';

@Component({
  selector: 'usa-sortable-table',
  templateUrl: './sortable-table.component.html',
  styles: [
  ]
})
export class SortableTableComponent {

  tableColumns = ['name', 'order', 'ratificationDate', 'admittedDate', 'votesInFavorPercent', 'votesInFavorNumber', 'population'];

  tableData: TableDataSource[] = [
    {name: 'Hawaii', order: '50th', ratificationDate: 'Jun. 27 1959', admittedDate: 'Aug. 21, 1959', votesInFavorPercent: '94.3%', votesInFavorNumber: '132,773', population: '632,772'},
    {name: 'Alaska', order: '49th', ratificationDate: 'Apr. 24, 1956', admittedDate: 'Jan. 3, 1959', votesInFavorPercent: '68.1%', votesInFavorNumber: '17,447', population: '226,167'},
    {name: 'New Mexico', order: '47th', ratificationDate: 'Nov. 5, 1911', admittedDate: 'Jan. 6, 1912', votesInFavorPercent: '70.3%', votesInFavorNumber: '31,742', population: '327,301'},
    {name: 'Arizona', order: '48th', ratificationDate: 'Feb. 9, 1911', admittedDate: 'Feb. 14, 1912', votesInFavorPercent: '78.7%', votesInFavorNumber: '12,187', population: '204,354'},
    {name: 'Oklahoma', order: '46th', ratificationDate: 'Sep. 17, 1907', admittedDate: 'Nov 16, 1907', votesInFavorPercent: '71.2%', votesInFavorNumber: '180,333', population: '1,657,155'},
    {name: 'Utah', order: '45th', ratificationDate: 'Nov. 5, 1895', admittedDate: 'Jan. 4, 1896', votesInFavorPercent: '80.5%', votesInFavorNumber: '31,305', population: '210,779'},
  ]
  

  compareCommaSeparatedNumbers(numberA: string, numberB: string) {
    const commaRemovedA = parseFloat(numberA.replace(/,/g, ''));
    const commaRemovedB = parseFloat(numberB.replace(/,/g, ''));

    return commaRemovedA - commaRemovedB;
  }

  compareDates(dateA: any, dateB: any) {
    const parsedDateA = new Date(Date.parse(dateA));
    const parsedDateB = new Date(Date.parse(dateB));
    
    return parsedDateA.getTime() - parsedDateB.getTime();
  }

  onSortClicked($event: {column: string, sortState: 'ascending' | 'descending'}) {
    console.log($event)
  }
}
