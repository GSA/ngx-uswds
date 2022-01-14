import { Component, Input } from '@angular/core';
import { ModalDismissReasons, UsaModalService, UsaModalRef } from '@gsa-sam/ngx-uswds';

@Component({
  selector: 'modal-basic',
  templateUrl: './modal-basic.component.html'
})
export class ModalBasicComponent {

  /** See UsaModelOptions for description on these inputs */

  @Input() animation = true;
  @Input() showClose =  true;
  @Input() backdrop: boolean  = true;
  @Input() keyboard = false;
  @Input() ariaDescribedBy: string;
  @Input() id: string = 'modal-1';
  @Input() ariaLabelledBy: string = 'modal-1-heading';
  @Input() size: 'sm' | 'lg' = 'lg';
  @Input() modalDialogClass: string;
  @Input() beforeDismiss: () => boolean | Promise<boolean>;

  closeResult = '';

  modalRef: UsaModalRef;

  constructor(private modalService: UsaModalService) { }

  open(content) {
    this.modalRef = this.modalService.open(content,
      {
        ariaLabelledBy: this.ariaLabelledBy,
        id: this.id,
        showClose: this.showClose,
        backdrop: this.backdrop,
        keyboard: this.keyboard,
        animation: this.animation,
        ariaDescribedBy: this.ariaDescribedBy,
        size: this.size,
        modalDialogClass: this.modalDialogClass,
        beforeDismiss: this.beforeDismiss,
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
