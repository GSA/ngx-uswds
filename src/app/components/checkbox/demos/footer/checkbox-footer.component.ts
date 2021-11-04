import { Component } from "@angular/core";
import { TableDataSource } from "uswds-components";


@Component({
  selector: `usa-checkbox-demo`,
  templateUrl: `./checkbox-footer.component.html`
})
export class CheckboxFooterComponent {
  columnHeaders = ['variable', 'description'];
  dataRows: TableDataSource = [
    {
      variable: ' $theme-checkbox-border-radius',
      description: 'Checkbox border radius for rounded corners.',
    },
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