import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsaNavigationMode } from '../util/navigation';
import { SidenavModel } from './sidenav.model';


@Component({
  selector: `usa-sidenav`,
  templateUrl: `sidenav.component.html`,
  styleUrls: ['./sidenav.component.scss']
})
export class UsaSidenavComponent implements OnInit {

  NavigationMode = UsaNavigationMode;

  @Input() sidenavContent: SidenavModel[];

  /**
   * Enables navigation items to be toggled. By default all EXTERNAL and INTERNAL links are fully collapsed unless specified in sidenavContent.
   *
   * 'single' will allow only one branch to be expanded at a time. If a new branch is expanded, all open branches will collapse
   *
   * 'multiple' will allow all branches to be expanded independently of each other.
   */
  @Input() expandType: 'single' | 'multiple';

  /**
   * Collapse the children of LABEL by default. Setting to false has no effect on behavior of single-select. This behavior can be overriden on a link by link basis via configuation
   */
  @Input() autoCollapseLabels: boolean = true;

  /**
   * Enables links with a mode of NavigationMode.LABEL to be collapsed, by default they are expanded and locked.
   */
  @Input() enableLabelCollapse = false;

  /**
   * If true, the first child of the first label in the side nav will be selected by default
   */
  @Input() selectFirstLabelChild = false;



  @Output() sidenavClicked = new EventEmitter<SidenavModel>();

  ngOnInit(): void {
    // If collapse is enabled, collapse all children by default. If label, expand to show children and select the first child of the first label
    if (this.expandType) {
      this.sidenavContent.map(link => {
        if (link.mode !== UsaNavigationMode.LABEL) {
          // By default, link will not be expanded to show children. But this can be overridden for a given link based on configuration
          link.collapsed = link.collapsed === undefined ? true : link.collapsed;
        }
        else {
          link.collapsed = link.collapsed === undefined ? !this.autoCollapseLabels && this.expandType !== 'multiple' : link.collapsed;
        }
        if (link.children) {
          this.collapseChildren(link);
        }
      });
    }
  }

  private collapseChildren(link: SidenavModel): void {
    link.children = link.children.map(childLink => {
      childLink.collapsed = true;
      return childLink;
    });
  }

  onSidenavItemClicked(item: SidenavModel): void {

    this.deselectSideNav(this.sidenavContent);
    this.selectSideNav(item, this.sidenavContent);
    if (item.children && this.canCollapseLabel(item)) {
      item.collapsed = !item.collapsed;
      this.toggleBasedOnSelected(item.children);
    }
    if (this.expandType === 'single') {

      this.toggleBasedOnSelected(this.sidenavContent);
    }
    this.sidenavClicked.emit(item);
  }

  /**
   *
   * @param link - Link which has been clicked on
   * @returns true if either link is not a label, or it is a label and label collapse is enabled
   */
  private canCollapseLabel(link: SidenavModel): boolean {
    return link.mode === UsaNavigationMode.LABEL ? this.enableLabelCollapse : true;
  }

  private toggleBasedOnSelected(links: SidenavModel[]): void {
    links.forEach(link => {
      link.collapsed = link.selected ? false : true;
      if (link.children) {
        this.toggleBasedOnSelected(link.children);
      }
      return;
    });
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
   * When expandType is multiple, expands all collapseable links in sidenav
   */
  public expandAll(): void {
    if (this.expandType === 'multiple') {
      this.sidenavContent.forEach(link => this.expandChildren(link, false));
    }
  }

  /**
   * Collapses all links
   */
  public collapseAll(): void {
    this.sidenavContent.forEach(link => this.expandChildren(link, true));
  }

  private expandChildren(link: SidenavModel, collapsedValue: boolean): void {
    if (link.children) {
      link.collapsed = collapsedValue;
      link.children.forEach(childLink => childLink.children ? this.expandChildren(childLink, collapsedValue) : null);
    }
  }
  private queryStringBuilder(item: SidenavModel): string {
    const ret = [];
    let keys = [];
    if (item.queryParams) {
      keys = Object.keys(item.queryParams);
    }
    for (const d of keys) {
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(item.queryParams[d]));
    }
    return ret.join('&');
  }

  /**
   * creates url from provided route and query params
   * @param item - Link to use when building url
   */
  urlBuilder(item: SidenavModel): string {
    let url = item.path;
    const queryParams = this.queryStringBuilder(item);
    if (queryParams) {
      if (url.indexOf('?') === -1) {
        url += '?' + queryParams;
      } else if (url.indexOf('?') === url.length - 1) {
        url += queryParams;
      } else {
        url += '&' + queryParams;
      }
    }
    return url;
  }

}
