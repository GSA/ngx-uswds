import { CommonModule } from "@angular/common";
import { Component, ElementRef, NgModule } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Key } from '../util/key';
import { UsaModalService } from "./modal";
import { UsaModalOptions } from "./modal-config";
import { ModalDismissReasons } from "./modal-dismiss-reasons";
import { UsaModalRef } from "./modal-ref";
import { UsaModalModule } from "./modal.module";


describe('UsaModal', () => {
  let fixture: ComponentFixture<UsaModalTestComponent>;
  let component: UsaModalTestComponent;

  let openModal = () => {
    const openButton: HTMLButtonElement = component._el.nativeElement.querySelector('#modal-test-open');
    openButton.click();
  }

  beforeEach( waitForAsync(() => {
    TestBed.configureTestingModule({imports: [UsaModalTestModule]}).compileComponents();
    fixture = TestBed.createComponent(UsaModalTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  afterEach(waitForAsync(() => {
    fixture.destroy();
  }));

  it('Should open and close modal', (done: DoneFn) => {
    openModal();

    component.modalRef.shown.toPromise().then(() => {
      const overlayModel: HTMLElement = document.body.querySelector('.usa-modal-overlay');
      expect(overlayModel).toBeDefined();
      const closeButton: HTMLButtonElement = overlayModel.querySelector('#modal-test-close');
      closeButton.click();
    });

    component.modalRef.hidden.subscribe(() => {
      expect(document.body.querySelector('.usa-modal-overlay')).toBeNull();
      done();
    });
  });

  it('Should close on backdrop click', (done: DoneFn) => {
    openModal();

    component.modalRef.shown.subscribe(() => {
      const overlayModel: HTMLElement = document.body.querySelector('.usa-modal-overlay');
      overlayModel.click();
    });

    component.modalRef.dismissed.subscribe(reason => {
      expect(reason).toEqual(ModalDismissReasons.BACKDROP_CLICK);
      done();
    });
  });

  it('Should close on close button click', (done: DoneFn) => {
    openModal();

    component.modalRef.shown.subscribe(() => {
      const closeButton: HTMLElement = document.body.querySelector('.usa-modal__close');
      closeButton.click();
    });

    component.modalRef.dismissed.subscribe(reason => {
      expect(reason).toEqual(ModalDismissReasons.CLOSE_CLICKED);
      done();
    });
  });

  it('Should close on escape press', (done: DoneFn) => {
    openModal();

    component.modalRef.shown.subscribe(() => {
      const modalEl = document.querySelector('usa-modal-window') as HTMLElement;
      const event = new KeyboardEvent('keydown', {key: Key.Escape, bubbles: true});
      modalEl.dispatchEvent(event);
    });

    component.modalRef.dismissed.subscribe(reason => {
      expect(reason).toEqual(ModalDismissReasons.ESC);
      done();
    });
  });
});

@Component({
  template: `
    <ng-template #content let-modal>
      <h2 class="usa-modal__heading" id="modal-test">
        Test Modal
      </h2>
      <div class="usa-modal__footer">
        <button type="button" class="usa-button" id="modal-test-close" (click)="close('Close')">Close</button>
      </div>
    </ng-template>
    <button class="usa-button" id="modal-test-open" (click)="open(content)">Launch Default modal</button>
    <hr>
  `
})
class UsaModalTestComponent {
  closeResult: ModalDismissReasons;
  modalOptions: UsaModalOptions = {ariaLabelledBy: 'modal-test'};
  modalRef: UsaModalRef;

  constructor(
    private modalService: UsaModalService,
    public _el: ElementRef,
  ) {}

  open(content) {
    this.modalRef = this.modalService.open(content, this.modalOptions)
    this.modalRef.result.then((result) => {
      this.closeResult = result;
    });
  }

  close(reason) {
    this.modalRef.close(reason);
  }
}

@NgModule({
  imports: [
    CommonModule,
    UsaModalModule,
    NoopAnimationsModule,
  ],
  declarations: [
    UsaModalTestComponent
  ]
})
class UsaModalTestModule {}
