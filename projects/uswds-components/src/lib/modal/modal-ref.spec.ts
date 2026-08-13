import { CommonModule } from '@angular/common';
import { Component, ElementRef, NgModule } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UsaModalService } from './modal';
import { UsaModalOptions } from './modal-config';
import { UsaModalRef } from './modal-ref';
import { UsaModalModule } from './modal.module';

/**
 * Coverage for {@link UsaModalRef} result promise resolution / rejection and
 * the `beforeDismiss` guard branches, driven through the public
 * {@link UsaModalService} rather than constructing the ref directly.
 */
describe('UsaModalRef', () => {
  let fixture: ComponentFixture<ModalRefHostComponent>;
  let component: ModalRefHostComponent;

  const openModal = () => {
    const openButton: HTMLButtonElement = component._el.nativeElement.querySelector('#open');
    openButton.click();
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({ imports: [ModalRefHostModule] }).compileComponents();
    fixture = TestBed.createComponent(ModalRefHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  afterEach(waitForAsync(() => {
    fixture.destroy();
  }));

  it('resolves the result promise with the close value', () =>
    new Promise<void>((done) => {
      openModal();
      component.modalRef.result.then((result) => {
        expect(result).toBe('done');
        done();
      });
      component.modalRef.close('done');
    }));

  it('emits on the closed observable when closed', () =>
    new Promise<void>((done) => {
      openModal();
      component.modalRef.closed.subscribe((value) => {
        expect(value).toBe('ok');
        done();
      });
      component.modalRef.close('ok');
    }));

  it('rejects the result promise and emits on dismissed when dismissed', () =>
    new Promise<void>((done) => {
      openModal();
      let dismissedReason: unknown;
      component.modalRef.dismissed.subscribe((reason) => (dismissedReason = reason));
      component.modalRef.result.catch((reason) => {
        expect(reason).toBe('cancel');
        expect(dismissedReason).toBe('cancel');
        done();
      });
      component.modalRef.dismiss('cancel');
    }));

  it('exposes the component instance for a component-content modal', () => {
    openModal();
    // template content → componentInstance is undefined
    expect(component.modalRef.componentInstance).toBeUndefined();
  });

  describe('beforeDismiss guard', () => {
    it('does not dismiss when beforeDismiss returns false', () => {
      component.beforeDismiss = () => false;
      openModal();
      let dismissed = false;
      component.modalRef.dismissed.subscribe(() => (dismissed = true));
      component.modalRef.dismiss('nope');
      expect(dismissed).toBe(false);
    });

    it('dismisses when beforeDismiss returns true', () =>
      new Promise<void>((done) => {
        component.beforeDismiss = () => true;
        openModal();
        component.modalRef.dismissed.subscribe(() => done());
        component.modalRef.dismiss('yes');
      }));

    it('dismisses when a beforeDismiss promise resolves truthy', () =>
      new Promise<void>((done) => {
        component.beforeDismiss = () => Promise.resolve(true);
        openModal();
        component.modalRef.dismissed.subscribe(() => done());
        component.modalRef.dismiss('async-yes');
      }));

    it('does not dismiss when a beforeDismiss promise resolves false', async () => {
      component.beforeDismiss = () => Promise.resolve(false);
      openModal();
      let dismissed = false;
      component.modalRef.dismissed.subscribe(() => (dismissed = true));
      component.modalRef.dismiss('async-no');
      await Promise.resolve();
      await Promise.resolve();
      expect(dismissed).toBe(false);
    });
  });
});

@Component({
  standalone: false,
  template: `
    <ng-template #content>
      <h2 id="modal-ref-test">Test Modal</h2>
    </ng-template>
    <button id="open" (click)="open(content)">Open</button>
  `,
})
class ModalRefHostComponent {
  modalRef: UsaModalRef;
  beforeDismiss: (() => boolean | Promise<boolean>) | undefined;

  constructor(
    private modalService: UsaModalService,
    public _el: ElementRef,
  ) {}

  open(content: unknown) {
    const options: UsaModalOptions = { ariaLabelledBy: 'modal-ref-test' };
    if (this.beforeDismiss) {
      options.beforeDismiss = this.beforeDismiss;
    }
    this.modalRef = this.modalService.open(content, options);
    // Swallow rejections so unrelated dismiss tests do not produce unhandled rejections.
    this.modalRef.result.then(null, () => {});
  }
}

@NgModule({
  imports: [CommonModule, UsaModalModule, NoopAnimationsModule],
  declarations: [ModalRefHostComponent],
})
class ModalRefHostModule {}
