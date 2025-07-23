import { Component, OnInit } from '@angular/core';
import { ThemeSwitcherService } from './shared/theme-switcher/theme-switcher.service';

	@Component({
	standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private themeSwitcher: ThemeSwitcherService,
  ) { }

  ngOnInit() {
    this.themeSwitcher.setStyle('theme', 'uswds-styles.css');
  }
}
