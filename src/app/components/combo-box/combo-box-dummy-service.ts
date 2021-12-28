import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { mockData } from "./combo-box-dummy-data";


/**
 * Mock api behavior
 */
@Injectable()
export class ComboBoxMockService {

  private mockdata = mockData;
  mockData$ = new BehaviorSubject(mockData);

  get() {
    return this.mockData$.asObservable();
  }

  query(searchText: string) {
    const searchLower = searchText.toLowerCase();
    const filteredData = this.mockdata.filter(data => data.name.toLowerCase().indexOf(searchLower) != -1);
    this.mockData$.next(filteredData);
  }
}