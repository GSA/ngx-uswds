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
    const filteredData = this.mockdata.filter(data => data.name.indexOf(searchText) != -1 || data.id.indexOf(searchText) != -1);
    this.mockData$.next(filteredData);
  }
}