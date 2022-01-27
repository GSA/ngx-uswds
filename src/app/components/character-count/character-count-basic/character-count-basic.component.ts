import { Component, Input } from "@angular/core";

@Component({
  selector: 'character-count-basic',
  templateUrl: './character-count-basic.component.html'
})
export class CharacterCountBasic {
  /** Defines max amount of characters allowed in input field */
  @Input() characterCount = 25;
}
