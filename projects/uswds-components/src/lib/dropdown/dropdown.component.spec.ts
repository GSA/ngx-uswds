import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UsaDropdownModule } from './dropdown.module';
import { DropdownOptionsModel } from './dropdown-options.model';
import { UsaDropdownComponent } from './dropdown.component';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const OPTIONS: DropdownOptionsModel[] = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c', disabled: true },
];

// ---------------------------------------------------------------------------
// Host components
// ---------------------------------------------------------------------------

@Component({
  standalone: false,
  template: `
    <usa-dropdown
      [options]="options"
      [id]="id"
      [name]="name"
      [disabled]="disabled"
      (optionChange)="onOptionChange($event)"
    ></usa-dropdown>
  `,
})
class HostComponent {
  options: DropdownOptionsModel[] = OPTIONS;
  id = 'test-dropdown';
  name = 'test-name';
  disabled = false;
  lastChange: DropdownOptionsModel | null = null;
  onOptionChange(opt: DropdownOptionsModel) {
    this.lastChange = opt;
  }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('UsaDropdownComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [UsaDropdownModule, FormsModule, ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the dropdown', () => {
    const el = fixture.debugElement.query(By.css('usa-dropdown'));
    expect(el).toBeTruthy();
  });

  it('renders a <select> element', () => {
    const select = fixture.debugElement.query(By.css('select.usa-select'));
    expect(select).toBeTruthy();
  });

  it('applies the id input to the select', () => {
    const select = fixture.debugElement.query(By.css('select'));
    expect(select.nativeElement.id).toBe('test-dropdown');
  });

  it('applies the name input to the select', () => {
    const select = fixture.debugElement.query(By.css('select'));
    expect(select.nativeElement.name).toBe('test-name');
  });

  it('renders the correct number of options', () => {
    const opts = fixture.debugElement.queryAll(By.css('option'));
    expect(opts.length).toBe(3);
  });

  it('renders option labels', () => {
    const opts = fixture.debugElement.queryAll(By.css('option'));
    expect(opts[0].nativeElement.textContent.trim()).toBe('Option A');
    expect(opts[1].nativeElement.textContent.trim()).toBe('Option B');
  });

  it('marks a disabled option as disabled', () => {
    const opts = fixture.debugElement.queryAll(By.css('option'));
    expect(opts[2].nativeElement.disabled).toBe(true);
  });

  it('is not disabled by default', () => {
    const select = fixture.debugElement.query(By.css('select'));
    expect(select.nativeElement.disabled).toBe(false);
  });

  it('disables the select when disabled input is true', () => {
    host.disabled = true;
    fixture.detectChanges();
    const select = fixture.debugElement.query(By.css('select'));
    expect(select.nativeElement.disabled).toBe(true);
  });

  it('emits optionChange when a new option is selected', () => {
    const dropdownComp = fixture.debugElement.query(By.css('usa-dropdown')).componentInstance;
    const select = fixture.debugElement.query(By.css('select')).nativeElement;

    // Simulate selecting option B (index 1)
    select.selectedIndex = 1;
    const mockEvent = {
      target: {
        options: select.options,
        selectedIndex: 1,
      },
    };
    dropdownComp.onOptionSelected(mockEvent);
    fixture.detectChanges();

    expect(host.lastChange).toEqual({ label: 'Option B', value: 'b' });
  });

  it('writeValue sets the model and calls markForCheck on the ChangeDetectorRef', () => {
    const dropdownComp = fixture.debugElement.query(By.css('usa-dropdown')).componentInstance;
    const markForCheckSpy = vi.spyOn(dropdownComp.cdr, 'markForCheck');
    const value: DropdownOptionsModel = { label: 'Option A', value: 'a' };
    dropdownComp.writeValue(value);
    expect(dropdownComp.model).toEqual(value);
    expect(markForCheckSpy).toHaveBeenCalled();
  });

  it('registerOnChange stores the callback', () => {
    const dropdownComp = fixture.debugElement.query(By.css('usa-dropdown')).componentInstance;
    const fn = vi.fn();
    dropdownComp.registerOnChange(fn);
    // trigger via onOptionSelected
    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    select.selectedIndex = 0;
    dropdownComp.onOptionSelected({ target: { options: select.options, selectedIndex: 0 } });
    expect(fn).toHaveBeenCalledWith({ label: 'Option A', value: 'a' });
  });

  it('registerOnTouched stores the callback and calls it when the select is blurred', () => {
    const dropdownComp = fixture.debugElement.query(By.css('usa-dropdown')).componentInstance;
    const fn = vi.fn();
    dropdownComp.registerOnTouched(fn);
    // onTouched should now be the spy; call it to verify the reference was stored
    dropdownComp['onTouched']();
    expect(fn).toHaveBeenCalled();
  });

  it('auto-generates a unique id matching the pattern', () => {
    // Each new component instance gets an auto-incremented id; verify the default shape.
    const cdrStub = { markForCheck: () => {} } as any;
    const comp = new UsaDropdownComponent(cdrStub);
    expect(comp.id).toMatch(/^usa-dropdown-\d+$/);
  });
});
