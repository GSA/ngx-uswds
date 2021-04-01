import { Component } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  page = {
    pageNumber: 1,
    pageSize: 25,
    totalPages: 10
  }

  top = { id: 'top' };
  bottom = { id: 'bottom' };

}
