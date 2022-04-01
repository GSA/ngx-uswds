import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { ComboBoxMockService } from "../combo-box-dummy-service";


@Component({
  selector: `combo-box-template`,
  templateUrl: './combo-box-template.component.html',
  providers: [ComboBoxMockService],
})
export class ComboBoxTemplateComponent {

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