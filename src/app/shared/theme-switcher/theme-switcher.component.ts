import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { ThemeSwitcherService } from "./theme-switcher.service";

@Component({
  selector: `usa-theme-switcher`,
  template: `
    <select #select class="usa-select display-inline width-auto bg-primary-dark text-base-lightest" aria-label="Application Theme Switcher">
      <option value="uswds">USWDS Styles</option>
      <option value="samStyles">Sam Styles</option>
    </select>
  `
})
export class ThemeSwitcherComponent implements AfterViewInit {
  @ViewChild('select') themeSelector: ElementRef<HTMLSelectElement>;
  
  currentStyle = 'uswds';

  constructor(
    private themeSwitcherService: ThemeSwitcherService
  ) {}

  ngAfterViewInit() {
    this.themeSelector.nativeElement.addEventListener('change', ($event) => {
      this.currentStyle = ($event.target as HTMLSelectElement).value;
      if (this.currentStyle === 'uswds') {
        this.themeSwitcherService.setStyle('theme', 'uswds-styles.css');
      } else if (this.currentStyle  === 'samStyles') {
        this.themeSwitcherService.setStyle('theme', 'sam-styles.css');
      }
    });

    this.themeSwitcherService.setStyle('theme', 'uswds-styles.css');

  }
}