import { CommonModule } from '@angular/common';
import { Component, ElementRef, NgModule } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Key } from '../util/key';
import { UsaModalService } from './modal';
import { UsaModalOptions } from './modal-config';
import { ModalDismissReasons } from './modal-dismiss-reasons';
import { UsaModalRef } from './modal-ref';
import { UsaModalModule } from './modal.module';

describe('UsaModal', () => {
  let fixture: ComponentFixture<UsaModalTestComponent>;
  let component: UsaModalTestComponent;

  let openModal = () => {
    const openButton: HTMLButtonElement = component._el.nativeElement.querySelector('#modal-test-open');
    openButton.click();
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({ imports: [UsaModalTestModule] }).compileComponents();
    fixture = TestBed.createComponent(UsaModalTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  afterEach(waitForAsync(() => {
    fixture.destroy();
  }));

  // NOTE ON ORDERING: under Vitest + `NoopAnimationsModule`, the modal window's
  // `(@dialogContainer.done)` callback fires *synchronously* while `open()` runs,
  // so `modalRef.shown` has already emitted-and-completed by the time the test
  // body regains control. (Under the old Karma/real-browser setup this fired on a
  // later tick.) Each test therefore opens the modal first (`openModal()`), which
  // synchronously attaches the overlay and populates `component.modalRef`, and
  // only then subscribes to the completion observables (`hidden`/`dismissed`)
  // *before* driving the close/dismiss interaction against the already-attached
  // overlay DOM.
  it('Should open and close modal', () =>
    new Promise<void>((done) => {
      openModal();

      component.modalRef.hidden.subscribe(() => {
        expect(document.body.querySelector('.usa-modal-overlay')).toBeNull();
        done();
      });

      const overlayModel: HTMLElement = document.body.querySelector('.usa-modal-overlay');
      expect(overlayModel).toBeDefined();
      const closeButton: HTMLButtonElement = overlayModel.querySelector('#modal-test-close');
      closeButton.click();
    }));

  it('Should close on backdrop click', () =>
    new Promise<void>((done) => {
      openModal();

      component.modalRef.dismissed.subscribe((reason) => {
        expect(reason).toEqual(ModalDismissReasons.BACKDROP_CLICK);
        done();
      });

      const overlayModel: HTMLElement = document.body.querySelector('.usa-modal-overlay');
      overlayModel.click();
    }));

  it('Should close on close button click', () =>
    new Promise<void>((done) => {
      openModal();

      component.modalRef.dismissed.subscribe((reason) => {
        expect(reason).toEqual(ModalDismissReasons.CLOSE_CLICKED);
        done();
      });

      const closeButton: HTMLElement = document.body.querySelector('.usa-modal__close');
      closeButton.click();
    }));

  it('Should close on escape press', () =>
    new Promise<void>((done) => {
      openModal();

      component.modalRef.dismissed.subscribe((reason) => {
        expect(reason).toEqual(ModalDismissReasons.ESC);
        done();
      });

      const modalEl = document.querySelector('usa-modal-window') as HTMLElement;
      const event = new KeyboardEvent('keydown', { key: Key.Escape, bubbles: true });
      modalEl.dispatchEvent(event);
    }));
});

@Component({
  standalone: false,
  template: `
    <ng-template #content let-modal>
      <h2 class="usa-modal__heading" id="modal-test">Test Modal</h2>
      <div class="usa-modal__footer">
        <button type="button" class="usa-button" id="modal-test-close" (click)="close('Close')">Close</button>
      </div>
    </ng-template>
    <button class="usa-button" id="modal-test-open" (click)="open(content)">Launch Default modal</button>
    <hr />
  `,
})
class UsaModalTestComponent {
  closeResult: string;
  dismissReason: ModalDismissReasons;
  modalOptions: UsaModalOptions = { ariaLabelledBy: 'modal-test' };
  modalRef: UsaModalRef;

  constructor(
    private modalService: UsaModalService,
    public _el: ElementRef,
  ) {}

  open(content) {
    this.modalRef = this.modalService.open(content, this.modalOptions);
    this.modalRef.result.then(
      (result) => {
        this.closeResult = result;
      },
      (reason: ModalDismissReasons) => {
        this.dismissReason = reason;
      },
    );
  }

  close(reason) {
    this.modalRef.close(reason);
  }
}

@NgModule({
  imports: [CommonModule, UsaModalModule, NoopAnimationsModule],
  declarations: [UsaModalTestComponent],
})
class UsaModalTestModule {}
