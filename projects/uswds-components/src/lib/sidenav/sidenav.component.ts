import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { SidenavModel } from './sidenav.model';


@Component({
  selector: `uswds-sidenav`,
  templateUrl: `sidenav.component.html`
})
export class USWDSSidenavComponent {

  @Input() sidenavContent: SidenavModel[];

  @Output() sidenavClicked = new EventEmitter<SidenavModel>();

  onSidenavItemClicked(item: SidenavModel): void {
    this.deselectSideNav(this.sidenavContent);
    this.selectSideNav(item, this.sidenavContent);
    this.deactivateChild(this.sidenavContent);
    this.sidenavClicked.emit(item);
  }

  /**
   * Deselects any previously selected sidenav item
   * @param sidenavItems
   */
  private deselectSideNav(sidenavItems: SidenavModel[]): void {
    sidenavItems.forEach(sideNavItem => {
      if (sideNavItem.children) {
        this.deselectSideNav(sideNavItem.children);
      }
      sideNavItem.selected = false;
    });
  }

  /**
   * Selects the clicked sidenav item as we as any parent
   * @param selectedItem
   * @param allNavItems
   */
  private selectSideNav(selectedItem: SidenavModel, allNavItems: SidenavModel[]): boolean {
    for (const item of allNavItems) {

      if (item === selectedItem) {
        item.selected = true;
        return true;
      } else if (item.children) {
        const isChildSelected = this.selectSideNav(selectedItem, item.children);
        if (isChildSelected) {
          item.selected = true;
          return true;
        }
      }
    }
    return false;
  }

  /**
   * If selected item is a grandchild link, the child link needs to not be active per uswds.
   * If selected link is a child link, child link needs to remain selected.
   * @param allNavItems
   */
  private deactivateChild(allNavItems: SidenavModel[]): void {
    const topLevelLink = allNavItems.find(item => item.selected);
    if (topLevelLink.children) {
      const selectedChildLink = topLevelLink.children.find(item => item.selected);
      if (selectedChildLink.children) {
        const selectedGrandchildLink = selectedChildLink.children.find(item => item.selected);
        if (selectedGrandchildLink) {
          selectedChildLink.selected = false;
        }
      }
    }
  }
}
