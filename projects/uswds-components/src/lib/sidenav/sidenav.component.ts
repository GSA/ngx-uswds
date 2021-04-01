import { Component, EventEmitter, Input, Output, TemplateRef } from "@angular/core";
import { SidenavModel } from "./sidenav.model";


@Component({
  selector: `uswds-sidenav`,
  templateUrl: `sidenav.component.html`
})
export class USWDSSidenavComponent {

  @Input() sidenavContent: SidenavModel[];

  @Output() sidenavClicked = new EventEmitter<SidenavModel>();

  onSidenavItemClicked(item: SidenavModel) {
    this.deselectSideNav(this.sidenavContent);
    this.selectSideNav(item, this.sidenavContent);
    this.sidenavClicked.emit(item);
  }

  /**
   * Deselects any previously selected sidenav item
   * @param sidenavItems 
   */
  private deselectSideNav(sidenavItems: SidenavModel[]) {
    sidenavItems.forEach(sideNavItem => {
      if (sideNavItem.children) {
        this.deselectSideNav(sideNavItem.children);
      }
      sideNavItem.selected = false;
    })
  }

  /**
   * Selects the clicked sidenav item as we as any parent
   * @param selectedItem 
   * @param allNavItems 
   */
  private selectSideNav(selectedItem: SidenavModel, allNavItems: SidenavModel[]) {
    for (let item of allNavItems) {

      if (item.children) {
        const isChildSelected = this.selectSideNav(selectedItem, item.children);
        if (isChildSelected) {
          item.selected = true;
          return true;
        }
      } else if (item === selectedItem) {
        item.selected = true;
        return true;
      }
    }
    return false;
  }
}