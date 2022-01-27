import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
@Component({
  selector: `app-home`,
  templateUrl: './home.component.html'
})
export class HomeComponent {
  formControl = new FormControl('');

  onSelection() {
    console.log(this.formControl.value);
  }
}