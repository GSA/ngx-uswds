import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsaFileInputComponent } from './file-input.component';
import { UsaFileInputModule } from './file-input.module';

// Helper: create a minimal File object
function makeFile(name: string, type = 'image/png'): File {
  return new File(['content'], name, { type });
}

describe('UsaFileInputComponent', () => {
  let component: UsaFileInputComponent;
  let fixture: ComponentFixture<UsaFileInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UsaFileInputModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsaFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ─── Drag state ────────────────────────────────────────────────────────────

  describe('drag state', () => {
    it('sets DRAG_OVER_STATE true on dragover', () => {
      component.onDragOver();
      expect(component.DRAG_OVER_STATE).toBe(true);
    });

    it('clears DRAG_OVER_STATE on dragleave', () => {
      component.onDragOver();
      component.onDragLeave();
      expect(component.DRAG_OVER_STATE).toBe(false);
    });

    it('clears DRAG_OVER_STATE on drop', () => {
      component.onDragOver();
      component.onFileDrop();
      expect(component.DRAG_OVER_STATE).toBe(false);
    });
  });

  // ─── onNewFilesUpload ───────────────────────────────────────────────────────

  describe('onNewFilesUpload', () => {
    it('returns early and does not change state when file list is empty', () => {
      component.selectedFiles = [];
      component.onNewFilesUpload({ target: { files: [] } } as any);
      expect(component.selectedFiles).toEqual([]);
      expect(component.ERROR_STATE).toBe(false);
    });

    it('sets ERROR_STATE and clears files when file type is invalid', () => {
      component.acceptFileType = '.pdf';
      const badFile = makeFile('image.png', 'image/png');
      component.onNewFilesUpload({ target: { files: [badFile] } } as any);
      expect(component.ERROR_STATE).toBe(true);
      expect(component.selectedFiles).toEqual([]);
      expect(component.inputFiles).toEqual([]);
    });

    it('clears ERROR_STATE and sets selectedFiles on valid upload (single mode)', () => {
      component.acceptFileType = '.png';
      component.multiple = false;
      const file = makeFile('photo.png', 'image/png');
      const emitted: File[][] = [];
      component.selectedFilesChange.subscribe((f) => emitted.push(f));

      component.onNewFilesUpload({ target: { files: [file] } } as any);

      expect(component.ERROR_STATE).toBe(false);
      expect(component.selectedFiles).toEqual([file]);
      expect(component.inputFiles.length).toBe(1);
      expect(component.inputFiles[0].file).toBe(file);
      expect(emitted.length).toBe(1);
    });

    it('replaces files when multiple=true and clearFilesOnAdd=true', () => {
      component.multiple = true;
      component.clearFilesOnAdd = true;
      const existing = makeFile('old.png');
      component.selectedFiles = [existing];
      const newFile = makeFile('new.png');

      component.onNewFilesUpload({ target: { files: [newFile] } } as any);

      expect(component.selectedFiles).toEqual([newFile]);
    });

    it('appends files when multiple=true and clearFilesOnAdd=false', () => {
      component.multiple = true;
      component.clearFilesOnAdd = false;
      const existing = makeFile('old.png');
      component.selectedFiles = [existing];
      const newFile = makeFile('new.png');

      component.onNewFilesUpload({ target: { files: [newFile] } } as any);

      expect(component.selectedFiles).toEqual([existing, newFile]);
    });

    it('calls onChange and onTouched callbacks on valid upload', () => {
      const onChange = vi.fn();
      const onTouched = vi.fn();
      component.registerOnChange(onChange);
      component.registerOnTouched(onTouched);
      const file = makeFile('a.png');

      component.onNewFilesUpload({ target: { files: [file] } } as any);

      expect(onChange).toHaveBeenCalledWith([file]);
      expect(onTouched).toHaveBeenCalled();
    });

    it('generates unique imageIds for duplicate file names', () => {
      const file1 = makeFile('photo.png');
      const file2 = makeFile('photo.png');
      component.multiple = true;
      component.clearFilesOnAdd = false;

      component.onNewFilesUpload({ target: { files: [file1] } } as any);
      component.onNewFilesUpload({ target: { files: [file2] } } as any);

      const ids = component.inputFiles.map((f) => f.imageId);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  // ─── removeFile ────────────────────────────────────────────────────────────

  describe('removeFile', () => {
    it('removes the file and emits selectedFilesChange', () => {
      const file = makeFile('remove-me.png');
      component.selectedFiles = [file];
      component.inputFiles = [{ imageId: 'aimageId', isLoading: false, file }];
      const emitted: File[][] = [];
      component.selectedFilesChange.subscribe((f) => emitted.push(f));

      component.removeFile(file);

      expect(component.selectedFiles).toEqual([]);
      expect(emitted.length).toBe(1);
    });

    it('is a no-op when file is not in selectedFiles', () => {
      const file = makeFile('ghost.png');
      component.selectedFiles = [];
      component.inputFiles = [];
      const emitted: File[][] = [];
      component.selectedFilesChange.subscribe((f) => emitted.push(f));

      component.removeFile(file);

      expect(emitted.length).toBe(0);
    });
  });

  // ─── clearFiles ────────────────────────────────────────────────────────────

  describe('clearFiles', () => {
    it('resets selectedFiles and inputFiles and emits', () => {
      const file = makeFile('clear-me.png');
      component.selectedFiles = [file];
      component.inputFiles = [{ imageId: 'aid', isLoading: false, file }];
      const emitted: File[][] = [];
      component.selectedFilesChange.subscribe((f) => emitted.push(f));

      component.clearFiles();

      expect(component.selectedFiles).toEqual([]);
      expect(emitted.length).toBe(1);
    });
  });

  // ─── onUploadError ─────────────────────────────────────────────────────────

  describe('onUploadError', () => {
    it('emits the file on uploadError', () => {
      const file = makeFile('bad.png');
      const emitted: File[] = [];
      component.uploadError.subscribe((f) => emitted.push(f));

      component.onUploadError(file);

      expect(emitted).toEqual([file]);
    });
  });

  // ─── trackLoadedFilesBy ────────────────────────────────────────────────────

  describe('trackLoadedFilesBy', () => {
    it('returns the imageId of the item', () => {
      const file = makeFile('track.png');
      const item = { imageId: 'atrack__0000png', isLoading: false, file };
      expect(component.trackLoadedFilesBy(0, item)).toBe('atrack__0000png');
    });
  });

  // ─── writeValue ────────────────────────────────────────────────────────────

  describe('writeValue', () => {
    it('does nothing when disabled', () => {
      component.disabled = true;
      component.selectedFiles = [];
      component.writeValue([makeFile('ignored.png')]);
      expect(component.selectedFiles).toEqual([]);
    });

    it('does nothing when files is null/undefined', () => {
      component.selectedFiles = [];
      component.writeValue(null as any);
      expect(component.selectedFiles).toEqual([]);
    });

    it('sets ERROR_STATE when file types are invalid', () => {
      component.acceptFileType = '.pdf';
      component.writeValue([makeFile('bad.png', 'image/png')]);
      expect(component.ERROR_STATE).toBe(true);
    });

    it('rebuilds inputFiles and clears ERROR_STATE for valid files', () => {
      component.acceptFileType = '.png';
      const file = makeFile('valid.png', 'image/png');
      component.writeValue([file]);
      expect(component.ERROR_STATE).toBe(false);
      expect(component.selectedFiles).toEqual([file]);
      expect(component.inputFiles.length).toBe(1);
    });
  });

  // ─── setDisabledState ──────────────────────────────────────────────────────

  describe('setDisabledState', () => {
    it('sets disabled to true', () => {
      component.setDisabledState(true);
      expect(component.disabled).toBe(true);
    });

    it('sets disabled to false', () => {
      component.disabled = true;
      component.setDisabledState(false);
      expect(component.disabled).toBe(false);
    });
  });

  // ─── ControlValueAccessor callbacks ───────────────────────────────────────

  describe('ControlValueAccessor', () => {
    it('registerOnChange stores the callback', () => {
      const fn = vi.fn();
      component.registerOnChange(fn);
      // trigger via a valid upload so onChange fires
      component.onNewFilesUpload({ target: { files: [makeFile('cb.png')] } } as any);
      expect(fn).toHaveBeenCalled();
    });

    it('registerOnTouched stores the callback', () => {
      const fn = vi.fn();
      component.registerOnTouched(fn);
      component.onNewFilesUpload({ target: { files: [makeFile('touch.png')] } } as any);
      expect(fn).toHaveBeenCalled();
    });
  });

  // ─── _makeSafeForID branch coverage ────────────────────────────────────────

  describe('_makeSafeForID (via onNewFilesUpload)', () => {
    it('converts spaces to hyphens in imageId', () => {
      const file = makeFile('my photo.png');
      component.onNewFilesUpload({ target: { files: [file] } } as any);
      expect(component.inputFiles[0].imageId).toContain('-');
    });

    it('converts uppercase letters to img_ prefix in imageId', () => {
      const file = makeFile('Photo.png');
      component.onNewFilesUpload({ target: { files: [file] } } as any);
      expect(component.inputFiles[0].imageId).toContain('img_');
    });

    it('encodes other non-alphanumeric characters in imageId', () => {
      const file = makeFile('file@name.png');
      component.onNewFilesUpload({ target: { files: [file] } } as any);
      // @ is char code 64 (0x40) → __00040 (5-char hex via slice(-4) of '40')
      expect(component.inputFiles[0].imageId).toContain('__00040');
    });
  });

  // ─── acceptFileType edge cases ─────────────────────────────────────────────

  describe('acceptFileType validation', () => {
    it('accepts any file when acceptFileType is empty string', () => {
      component.acceptFileType = '';
      const file = makeFile('anything.xyz', 'application/octet-stream');
      component.onNewFilesUpload({ target: { files: [file] } } as any);
      expect(component.ERROR_STATE).toBe(false);
    });

    it('accepts file whose MIME type matches acceptFileType (wildcard-stripped)', () => {
      component.acceptFileType = 'image/*';
      const file = makeFile('photo.png', 'image/png');
      component.onNewFilesUpload({ target: { files: [file] } } as any);
      expect(component.ERROR_STATE).toBe(false);
    });

    it('rejects file that does not match extension or MIME', () => {
      component.acceptFileType = '.pdf';
      const file = makeFile('doc.docx', 'application/msword');
      component.onNewFilesUpload({ target: { files: [file] } } as any);
      expect(component.ERROR_STATE).toBe(true);
    });
  });
});
