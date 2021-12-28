import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ComboBoxMockService } from '../../combo-box-dummy-service';

@Component({
  selector: 'usa-combo-box-basic',
  templateUrl: './combo-box-basic.component.html',
  styles: [
  ]
})
export class ComboBoxBasicComponent implements OnInit {

  mockdata$: Observable<any>;

  searchValue = '';

  constructor(
    private mockService: ComboBoxMockService
  ) { }

  ngOnInit(): void {
    this.mockdata$ = this.mockService.get();
  }

  onValueChange($event) {
    this.searchValue = $event;
    this.mockService.query($event);
  }

}
