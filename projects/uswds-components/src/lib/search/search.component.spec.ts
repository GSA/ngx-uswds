import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsaSearchComponent } from './search.component';
import { UsaSearchModule } from './search.module';

describe('SearchComponent', () => {
  let component: UsaSearchComponent;
  let fixture: ComponentFixture<UsaSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UsaSearchModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onValueChange', () => {
    it('Should emit an event when the search input value changes', () => {
      const eventSpy = vi.spyOn(component.searchTextChange, 'emit');
      component.onValueChange('test');
      fixture.detectChanges();
      expect(eventSpy).toHaveBeenCalled();
    });
  });

  describe('focusChange', () => {
    it('Should emit an event on input blur', () => {
      const eventSpy = vi.spyOn(component.onBlur, 'emit');
      component.focusChange({ target: { value: 'test' } });
      fixture.detectChanges();
      expect(eventSpy).toHaveBeenCalled();
    });
  });

  describe('onKeydown', () => {
    it('Should update the model on Enter key', () => {
      const mockEv = {
        target: {
          value: 'test',
        },
        code: 'Enter',
        key: 'Enter',
        preventDefault: function () {},
      };
      const eventSpy = vi.spyOn(component, 'updateModel');
      component.onKeydown(mockEv);
      fixture.detectChanges();
      expect(eventSpy).toHaveBeenCalled();
      expect(component.model).toBe('test');
    });
  });
  describe('onSubmit', () => {
    it('Should update the model on when click on the submit', () => {
      const mockEv = {
        target: {
          value: 'test',
        },
        code: 'Enter',
        key: 'Enter',
        preventDefault: function () {},
      };
      component.onSubmit('test', mockEv);
      fixture.detectChanges();
      expect(component.model).toBe('test');
    });
  });
  describe('writeValue', () => {
    it('should implement controlvalueaccessor with default values', () => {
      component.registerOnChange((_) => undefined);
      component.registerOnTouched(() => undefined);
      component.writeValue('aaa');
      expect(component.model).toBe('aaa');
    });
  });

  describe('writeValue', () => {
    it('should implement controlvalueaccessor with empty values', () => {
      component.registerOnChange((_) => undefined);
      component.registerOnTouched(() => undefined);
      component.writeValue('');
      expect(component.model).toBe('');
    });
  });

  // -----------------------------------------------------------------------
  // onKeydown — non-Enter key (else branch)
  // -----------------------------------------------------------------------

  describe('onKeydown', () => {
    it('does not update model when a non-Enter key is pressed', () => {
      component.model = 'original';
      // Use a key code that is NOT Enter
      component.onKeydown({ code: 'Space', target: { value: 'new-value' }, preventDefault: () => {} });
      expect(component.model).toBe('original');
    });

    it('updates model and emits when Enter is pressed', () => {
      const submitted: string[] = [];
      component.registerOnChange((v) => submitted.push(v));
      component.onKeydown({ code: 'Enter', target: { value: 'search-term' }, preventDefault: () => {} });
      expect(component.model).toBe('search-term');
    });
  });

  // -----------------------------------------------------------------------
  // focusChange
  // -----------------------------------------------------------------------

  describe('focusChange', () => {
    it('emits the target value via onBlur output', () => {
      const values: string[] = [];
      component.onBlur.subscribe((v) => values.push(v));
      component.focusChange({ target: { value: 'typed-text' } });
      expect(values).toContain('typed-text');
    });
  });
});
