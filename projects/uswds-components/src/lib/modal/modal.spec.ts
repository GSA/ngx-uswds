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

// ---------------------------------------------------------------------------
// Modal — additional coverage: hasOpenModals, dismissAll, activeInstances,
// UsaModalRef.closed / shown, beforeDismiss branch, multiple modals
// ---------------------------------------------------------------------------

describe('UsaModal — additional coverage', () => {
  let fixture: ComponentFixture<UsaModalTestComponent>;
  let component: UsaModalTestComponent;

  const openModal = () => {
    const btn: HTMLButtonElement = component._el.nativeElement.querySelector('#modal-test-open');
    btn.click();
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

  it('hasOpenModals returns true while modal is open and false after close', () =>
    new Promise<void>((done) => {
      const svc = TestBed.inject(UsaModalService);
      openModal();
      expect(svc.hasOpenModals()).toBe(true);

      component.modalRef.hidden.subscribe(() => {
        expect(svc.hasOpenModals()).toBe(false);
        done();
      });
      component.close('done');
    }));

  it('activeInstances emits the open ref then empty after close', () =>
    new Promise<void>((done) => {
      const svc = TestBed.inject(UsaModalService);
      const emissions: any[][] = [];
      svc.activeInstances.subscribe((list) => emissions.push(list));

      openModal();
      expect(emissions[emissions.length - 1].length).toBe(1);

      component.modalRef.hidden.subscribe(() => {
        expect(emissions[emissions.length - 1].length).toBe(0);
        done();
      });
      component.close('done');
    }));

  it('dismissAll dismisses the modal with the supplied reason', () =>
    new Promise<void>((done) => {
      const svc = TestBed.inject(UsaModalService);
      openModal();

      component.modalRef.dismissed.subscribe((reason) => {
        expect(reason).toBe('bulk-dismiss');
        done();
      });

      svc.dismissAll('bulk-dismiss');
    }));

  it('UsaModalRef.closed emits the close result', () =>
    new Promise<void>((done) => {
      openModal();

      component.modalRef.closed.subscribe((result) => {
        expect(result).toBe('my-result');
        done();
      });

      component.close('my-result');
    }));
});

// ---------------------------------------------------------------------------
// beforeDismiss branch coverage
// ---------------------------------------------------------------------------

@Component({
  standalone: false,
  template: `
    <ng-template #content let-modal>
      <button id="bd-close" (click)="modal.close('done')">Close</button>
    </ng-template>
    <button id="bd-open" (click)="open(content)">Open</button>
  `,
})
class BeforeDismissComponent {
  modalRef: UsaModalRef;
  beforeDismiss: (() => boolean | Promise<boolean>) | undefined;

  constructor(
    private svc: UsaModalService,
    public el: ElementRef,
  ) {}

  open(content) {
    this.modalRef = this.svc.open(content, {
      ariaLabelledBy: 'bd-test',
      beforeDismiss: this.beforeDismiss,
    });
  }
}

@NgModule({
  imports: [CommonModule, UsaModalModule, NoopAnimationsModule],
  declarations: [BeforeDismissComponent],
})
class BeforeDismissModule {}

describe('UsaModalRef — beforeDismiss branches', () => {
  let fixture: ComponentFixture<BeforeDismissComponent>;
  let component: BeforeDismissComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({ imports: [BeforeDismissModule] }).compileComponents();
    fixture = TestBed.createComponent(BeforeDismissComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  afterEach(() => fixture.destroy());

  function openBD() {
    component.el.nativeElement.querySelector('#bd-open').click();
  }

  it('beforeDismiss returning false prevents dismissal', () =>
    new Promise<void>((done) => {
      component.beforeDismiss = () => false;
      openBD();
      const dismissed: any[] = [];
      component.modalRef.dismissed.subscribe((r) => dismissed.push(r));
      component.modalRef.dismiss('test-reason');
      // give a tick for any async to settle
      setTimeout(() => {
        expect(dismissed.length).toBe(0);
        component.modalRef.close('cleanup');
        done();
      }, 50);
    }));

  it('beforeDismiss returning true allows dismissal', () =>
    new Promise<void>((done) => {
      component.beforeDismiss = () => true;
      openBD();
      component.modalRef.dismissed.subscribe((reason) => {
        expect(reason).toBe('guarded-reason');
        done();
      });
      component.modalRef.dismiss('guarded-reason');
    }));

  it('beforeDismiss returning a Promise<true> allows dismissal', () =>
    new Promise<void>((done) => {
      component.beforeDismiss = () => Promise.resolve(true);
      openBD();
      component.modalRef.dismissed.subscribe((reason) => {
        expect(reason).toBe('async-reason');
        done();
      });
      component.modalRef.dismiss('async-reason');
    }));

  it('beforeDismiss returning a Promise<false> prevents dismissal', () =>
    new Promise<void>((done) => {
      component.beforeDismiss = () => Promise.resolve(false);
      openBD();
      const dismissed: any[] = [];
      component.modalRef.dismissed.subscribe((r) => dismissed.push(r));
      component.modalRef.dismiss('should-not-dismiss');
      setTimeout(() => {
        expect(dismissed.length).toBe(0);
        component.modalRef.close('cleanup');
        done();
      }, 100);
    }));
});

// ---------------------------------------------------------------------------
// UsaModalStack — string content + component content + _setAriaHidden branches
// ---------------------------------------------------------------------------

import { UsaActiveModal } from './modal-ref';

@Component({
  standalone: false,
  selector: 'usa-modal-content-cmp',
  template: `<span id="modal-comp-content">Component Content</span>`,
})
class ModalContentCmp {
  constructor(public activeModal: UsaActiveModal) {}
}

@NgModule({
  imports: [CommonModule, UsaModalModule, NoopAnimationsModule],
  declarations: [ModalContentCmp],
})
class ModalContentModule {}

describe('UsaModalStack — string and component content', () => {
  let svc: UsaModalService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({ imports: [UsaModalTestModule, ModalContentModule] }).compileComponents();
    svc = TestBed.inject(UsaModalService);
  }));

  it('opens with string content', () =>
    new Promise<void>((done) => {
      const ref = svc.open('Hello World', { ariaLabelledBy: 'string-modal' });
      expect(svc.hasOpenModals()).toBe(true);
      ref.closed.subscribe(() => done());
      ref.close('ok');
    }));

  it('UsaModalRef.componentInstance is accessible when component content is used', () =>
    new Promise<void>((done) => {
      const ref = svc.open(ModalContentCmp, { ariaLabelledBy: 'cmp-modal' });
      expect(ref.componentInstance).toBeTruthy();
      ref.closed.subscribe(() => done());
      ref.close('ok');
    }));
});
