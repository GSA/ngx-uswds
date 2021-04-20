import { Component } from "@angular/core";
import { ModalDismissReasons, UsaModal, UsaModalRef } from "uswds-components";

@Component({
  selector: `usa-modal-forced`,
  template: `
  <ng-template #content let-modal>
  <h2 class="usa-modal__heading" id="modal-3-heading">
    Your session will end soon.
  </h2>
  <div class="usa-prose">
    <p id="modal-3-description">You’ve been inactive for too long. Please choose to stay signed in or sign out. Otherwise, you’ll be signed out automatically in 5 minutes.</p>
  </div>
  <div class="usa-modal__footer">
    <ul class="usa-button-group">
      <li class="usa-button-group__item">
          <button type="button" class="usa-button" (click)="close('Sign In')">Yes, stay signed in</button>
        </li>
      <li class="usa-button-group__item">
          <button type="button" class="usa-button usa-button--unstyled padding-105 text-center" (click)="close('Sign Out')">Sign out</button>
        </li>
      </ul>
  </div>
  </ng-template>
  <button class="usa-button" (click)="open(content)">Launch Forced modal</button>
  <hr>
  <pre>{{ closeResult }}</pre>
  `
})
export class ModalForcedComponent {
  closeResult = '';

  modalRef: UsaModalRef;

  constructor(private modalService: UsaModal) {}

  open(content) {
    this.modalRef = this.modalService.open(content, 
      {
        showClose: false,
        backdrop: 'static'
      }
    );
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