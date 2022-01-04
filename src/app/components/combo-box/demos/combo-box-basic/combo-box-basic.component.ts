import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ComboBoxMockService } from '../../combo-box-dummy-service';

@Component({
  selector: 'usa-combo-box-basic',
  templateUrl: './combo-box-basic.component.html',
})
export class ComboBoxBasicComponent implements OnInit {

  mockdata$: Observable<any>;

  searchValue = '';

  _paginationAmount = 1;

  constructor(
    private mockService: ComboBoxMockService
  ) { }

  ngOnInit(): void {
    this.mockdata$ = this.mockService.get();
  }

  onValueChange($event) {
    this.searchValue = $event;

    if (!this.searchValue || !this.searchValue.length) {
      this._paginationAmount = 1;
    }

    this.mockService.query($event);
  }

  onScrollEnd() {
    this._paginationAmount++;
    this.mockService.fetchAdditionalData(this.searchValue, this._paginationAmount);
  }

}
