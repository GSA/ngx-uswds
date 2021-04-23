import { Component } from '@angular/core';
import { ModalDismissReasons, UsaActiveModal, UsaModalService, UsaModalRef } from "uswds-components";

@Component({
  selector: 'usa-modal-stacked',
  templateUrl: './modal-stacked.component.html',
})
export class ModalStackedComponent {

  closeResult = '';
  closeBResult = '';

  modalRef: UsaModalRef;
  modalBRef: UsaModalRef;

  constructor(private modalService: UsaModalService) {}

  open(content) {
    this.modalRef = this.modalService.open(content)
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openModalB() {
    this.modalBRef = this.modalService.open(ModalStackedBComponent);
    this.modalBRef.result.then((result) => {
      this.closeBResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeBResult = `Dismissed ${this.getDismissReason(reason)}`;
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

@Component({
  selector: `usa-modal-stacked-b`,
  template: `
    <h2 class="usa-modal__heading" id="modal-8-heading">
      Are you sure you want to continue?
    </h2>
    <div class="usa-prose">
      <p id="modal-8-description">You have unsaved changes that will be lost.</p>
    </div>
    <div class="usa-modal__footer">
      <ul class="usa-button-group">
        <li class="usa-button-group__item">
            <button type="button" class="usa-button" (click)="close('Continue')">Continue without saving</button>
        </li>
        <li class="usa-button-group__item">
          <button type="button" class="usa-button usa-button--unstyled padding-105 text-center" (click)="close('Go Back')">Go back</button>
        </li>
      </ul>
    </div>
  `
})
export class ModalStackedBComponent {

  constructor(private activeModal: UsaActiveModal) {}

  close(reason) {
    this.activeModal.close(reason);
  }
}
