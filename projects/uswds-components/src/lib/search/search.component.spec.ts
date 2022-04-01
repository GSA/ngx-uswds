import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsaSearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: UsaSearchComponent;
  let fixture: ComponentFixture<UsaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsaSearchComponent]
    })
      .compileComponents();
  });

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
      const eventSpy = spyOn(component.searchTextChange, 'emit');
      component.onValueChange('test');
      fixture.detectChanges()
      expect(eventSpy).toHaveBeenCalled();
    });
  });

  describe('focusChange', () => {
    it('Should emit an event on input blur', () => {
      const eventSpy = spyOn(component.onBlur, 'emit');
      component.focusChange({ target: { value: 'test' } });
      fixture.detectChanges()
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
        preventDefault: function () { }
      }
      const eventSpy = spyOn(component, 'updateModel');
      component.onKeydown(mockEv);
      fixture.detectChanges()
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
        preventDefault: function () { }
      }
      component.onSubmit('test', mockEv);
      fixture.detectChanges()
      expect(component.model).toBe('test');
    });
  });
  describe('writeValue', () => {
    it('should implement controlvalueaccessor with default values', () => {
      component.registerOnChange(_ => undefined);
      component.registerOnTouched(() => undefined);
      component.writeValue('aaa');
      expect(component.model).toBe('aaa');
    });
  })

  describe('writeValue', () => {
    it('should implement controlvalueaccessor with empty values', () => {
      component.registerOnChange(_ => undefined);
      component.registerOnTouched(() => undefined);
      component.writeValue('');
      expect(component.model).toBe('');
    });
  })

});
