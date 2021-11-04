import { Component } from '@angular/core';
import { ModalDismissReasons, UsaModalService, UsaModalRef } from "uswds-components";

@Component({
  selector: 'usa-modal-custom-focus',
  templateUrl: './modal-custom-focus.component.html',
})
export class ModalCustomFocusComponent {

  closeResult = '';

  modalRef: UsaModalRef;

  constructor(private modalService: UsaModalService) {}

  open(content) {
    this.modalRef = this.modalService.open(content)
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  close(reason) {
    this.modalRef.close(reason);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else if (reason === ModalDismissReasons.CLOSE_CLICKED) {
      return 'by clicking close button';
    }
    else {
      return `with: ${reason}`;
    }
  }
}
