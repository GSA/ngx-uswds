import { Component } from "@angular/core";


	@Component({
	standalone: false,
  selector: `demo-wrapper`,
  template: `
      <router-outlet></router-outlet>
  `
})
export class DemoWrapperComponent {}