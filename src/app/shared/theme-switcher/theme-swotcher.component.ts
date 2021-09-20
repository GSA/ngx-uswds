import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { ThemeSwitcherService } from "./theme-switcher.service";

@Component({
  selector: `usa-theme-switcher`,
  template: `
    <select #select class="usa-select display-inline width-auto bg-primary-dark text-base-lightest">
      <option value="uswds">USWDS Styles</option>
      <option value="samStyles">Sam Styles</option>
    </select>
  `
})
export class ThemeSwitcherComponent implements AfterViewInit {
  @ViewChild('select') themeSelector: ElementRef<HTMLSelectElement>;
  
  constructor(
    private themeSwitcherService: ThemeSwitcherService
  ) {}

  ngAfterViewInit() {
    this.themeSwitcherService.setStyle('base', 'uswds-styles.css');
    this.themeSelector.nativeElement.addEventListener('change', ($event) => {
      const value = ($event.target as HTMLSelectElement).value;
      if (value === 'uswds') {
        this.themeSwitcherService.setStyle('theme', 'uswds-styles.css');
      } else if (value === 'samStyles') {
        this.themeSwitcherService.setStyle('theme', 'sam-styles.css');
      }
    })
  }
}