import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Observable, Subject, of } from 'rxjs';
import { UsaFilePreviewDirective } from './file-preview.directive';

@Component({
  standalone: false,
  template: `<img [usaFilePreview] [file]="file" [uploadRequest]="uploadRequest" (uploadError)="onError($event)" />`,
})
class FilePreviewTestComponent {
  file = new File(['content'], 'document.pdf', { type: 'application/pdf' });
  uploadRequest: (file: File) => Observable<any>;
  errored: File | null = null;

  onError(file: File) {
    this.errored = file;
  }
}

describe('UsaFilePreviewDirective', () => {
  let fixture: ComponentFixture<FilePreviewTestComponent>;
  let component: FilePreviewTestComponent;

  const getImage = (): HTMLImageElement => fixture.nativeElement.querySelector('img');

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsaFilePreviewDirective, FilePreviewTestComponent],
    });
  });

  const build = () => {
    fixture = TestBed.createComponent(FilePreviewTestComponent);
    component = fixture.componentInstance;
  };

  it('should create an instance', () => {
    build();
    component.uploadRequest = () => of(null);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should keep loading state until a multi-emission upload stream completes', fakeAsync(() => {
    build();
    const upload$ = new Subject<any>();
    component.uploadRequest = () => upload$.asObservable();
    fixture.detectChanges();

    const image = getImage();
    expect(image.classList.contains('is-loading')).toBe(true);

    // Progress events should not clear the loading state early.
    upload$.next({ type: 'sent' });
    upload$.next({ type: 'progress', loaded: 50 });
    tick();
    expect(image.classList.contains('is-loading')).toBe(true);
    expect(component.errored).toBeNull();

    // Only completion resolves the promise and clears loading.
    upload$.next({ type: 'response' });
    upload$.complete();
    tick();
    expect(image.classList.contains('is-loading')).toBe(false);
    expect(component.errored).toBeNull();
  }));

  it('should resolve on an empty-but-successful stream without erroring', fakeAsync(() => {
    build();
    const upload$ = new Subject<any>();
    component.uploadRequest = () => upload$.asObservable();
    fixture.detectChanges();

    const image = getImage();
    expect(image.classList.contains('is-loading')).toBe(true);

    // Completes with no emissions — previously toPromise() resolved here.
    upload$.complete();
    tick();
    expect(image.classList.contains('is-loading')).toBe(false);
    expect(component.errored).toBeNull();
  }));

  it('should emit uploadError and clear the preview when the stream errors', fakeAsync(() => {
    build();
    const upload$ = new Subject<any>();
    component.uploadRequest = () => upload$.asObservable();
    fixture.detectChanges();

    const image = getImage();
    upload$.next({ type: 'progress', loaded: 25 });
    upload$.error(new Error('upload failed'));
    tick();

    expect(image.classList.contains('is-loading')).toBe(false);
    expect(image.getAttribute('src')).toBe('');
    expect(component.errored).toBe(component.file);
  }));
});
