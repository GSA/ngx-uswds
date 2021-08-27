import { AfterViewInit, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { SidenavModel } from './sidenav.model';


@Component({
  selector: `uswds-sidenav`,
  templateUrl: `sidenav.component.html`,
  styleUrls: ['sidenav.component.scss']
})
export class USWDSSidenavComponent implements OnInit {

  @Input() sidenavContent: SidenavModel[];

  @Input() enableCollapse = false;

  /**
   * Classes to be applied to toggle button
   */
  @Input() buttonClasses = '';

  @Output() sidenavClicked = new EventEmitter<SidenavModel>();

  @ContentChild('expand')
  expand: TemplateRef<any>;

  @ContentChild('collapse')
  collapse: TemplateRef<any>;

  ngOnInit(): void {
    // If collapse is enabled, collapse all children by default
    if (this.enableCollapse) {
      this.sidenavContent.map(link => {
        if (link.children) {
          link.collapsed = link.collapsed === undefined ? true : link.collapsed;
          this.collapseChildren(link);
        }
      });
    }
  }

  collapseChildren(link: SidenavModel): void {
    link.children = link.children.map(childLink => {
      childLink.collapsed = true;
      return childLink;
    });
  }

  onSidenavItemClicked(item: SidenavModel): void {
    this.deselectSideNav(this.sidenavContent);
    this.selectSideNav(item, this.sidenavContent);
    this.deactivateChild(this.sidenavContent);
    if (item.children) {
      item.collapsed = false;
    }
    this.sidenavClicked.emit(item);
  }

  toggleChildrenExpansion(link: SidenavModel): void {
    link.children.map(childLink => childLink.collapsed = !childLink.collapsed);
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
      if (selectedChildLink?.children) {
        const selectedGrandchildLink = selectedChildLink.children.find(item => item.selected);
        if (selectedGrandchildLink) {
          selectedChildLink.selected = false;
        }
      }
    }
  }

  handleButtonClick(link: SidenavModel): void {
    link.collapsed = !link.collapsed;
  }

  expandAll(): void {
    this.sidenavContent.forEach(link => this.expandChildren(link, false));
  }

  collapseAll(): void {
    this.sidenavContent.forEach(link => this.expandChildren(link, true));
  }

  private expandChildren(link: SidenavModel, collapsedValue: boolean): void {
    if (link.children) {
      link.collapsed = collapsedValue;
      link.children.forEach(childLink => childLink.children ? this.expandChildren(childLink, collapsedValue) : null);
    }
  }
}
