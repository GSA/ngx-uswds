import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Observable, Subject, of } from 'rxjs';
import { UsaFileInputModule } from './file-input.module';

@Component({
  standalone: false,
  template: `<img
    alt="file preview"
    [usaFilePreview]
    [file]="file"
    [uploadRequest]="uploadRequest"
    (uploadError)="onError($event)"
  />`,
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
      imports: [UsaFileInputModule],
      declarations: [FilePreviewTestComponent],
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

  // ─── no uploadRequest ───────────────────────────────────────────────────────────────

  describe('no uploadRequest', () => {
    let createObjectURL: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      // jsdom does not implement URL.createObjectURL — stub only that method
      // so the URL constructor and other URL statics remain intact.
      createObjectURL = vi.fn(() => 'blob:mock-url');
      URL.createObjectURL = createObjectURL as unknown as typeof URL.createObjectURL;
    });

    afterEach(() => {
      // Restore so the stub never leaks into other tests.
      delete (URL as any).createObjectURL;
    });

    it('shows a direct preview for an image file when no uploadRequest is given', () => {
      build();
      component.file = new File(['img'], 'photo.png', { type: 'image/png' });
      fixture.detectChanges();

      const image = getImage();
      expect(image.classList.contains('is-loading')).toBe(false);
      expect(createObjectURL).toHaveBeenCalledWith(component.file);
    });

    it('adds a non-image preview class when no uploadRequest and file is not an image', () => {
      build();
      component.file = new File(['doc'], 'report.pdf', { type: 'application/pdf' });
      fixture.detectChanges();

      const image = getImage();
      expect(image.classList.contains('is-loading')).toBe(false);
      expect(image.classList.contains('usa-file-input__preview-image--pdf')).toBe(true);
    });
  });

  // ─── _getFilePreviewClass branches ──────────────────────────────────────────────

  const previewClassCases: Array<[string, string, string]> = [
    ['pdf', 'report.pdf', 'usa-file-input__preview-image--pdf'],
    ['doc', 'letter.doc', 'usa-file-input__preview-image--word'],
    ['pages', 'letter.pages', 'usa-file-input__preview-image--word'],
    ['xls', 'data.xls', 'usa-file-input__preview-image--excel'],
    ['numbers', 'data.numbers', 'usa-file-input__preview-image--excel'],
    ['mov', 'clip.mov', 'usa-file-input__preview-image--video'],
    ['mp4', 'clip.mp4', 'usa-file-input__preview-image--video'],
    ['generic', 'archive.zip', 'usa-file-input__preview-image--generic'],
  ];

  previewClassCases.forEach(([label, fileName, expectedClass]) => {
    it(`applies ${expectedClass} for ${label} file`, () => {
      build();
      component.file = new File(['data'], fileName, { type: 'application/octet-stream' });
      fixture.detectChanges();

      const image = getImage();
      expect(image.classList.contains(expectedClass)).toBe(true);
    });
  });
});
