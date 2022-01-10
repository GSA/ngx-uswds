import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { mockData } from "./combo-box-dummy-data";


/**
 * Mock api behavior
 */
@Injectable()
export class ComboBoxMockService {

  private mockdata = mockData;
  readonly itemsPerPage = 20;

  mockData$ = new BehaviorSubject(mockData.slice(0, this.itemsPerPage));

  get() {
    return this.mockData$.asObservable();
  }

  query(searchText: string, itemsLength = this.itemsPerPage) {
    const searchLower = searchText.toLowerCase();
    let filteredData = this.mockdata.filter(data => data.name.toLowerCase().indexOf(searchLower) != -1);
    if (filteredData.length > itemsLength) {
      filteredData = filteredData.slice(0, itemsLength);
    }

    this.mockData$.next(filteredData);
  }

  fetchAdditionalData(searchText: string, page: number) {
    this.query(searchText, page * this.itemsPerPage);
  }
}