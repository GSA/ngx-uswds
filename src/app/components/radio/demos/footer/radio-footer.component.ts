import { Component } from "@angular/core";
import { TableDataSource } from "uswds-components";


@Component({
  selector: `radio-footer-demo`,
  templateUrl: `./radio-footer.component.html`
})
export class RadioFooterComponent {
  columnHeaders = ['variable', 'description'];
  dataRows: TableDataSource = [
    {
      variable: '$theme-input-tile-background-color-selected', 
      description: 'Tile background color when selected.'
    },
    {
      variable: '$theme-input-tile-border-radius', 
      description: 'Tile border radius for rounded corners.'
    },
    {
      variable: '$theme-input-tile-border-width', 
      description: 'Tile border thickness.'
    },
    {
      variable: '$theme-input-tile-border-color', 
      description: 'Tile border color.'
    },
    {
      variable: '$theme-input-tile-border-color-selected', 
      description: 'Tile border color when selected.'
    }
  ]
}