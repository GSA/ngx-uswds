import { QueryParamsHandling } from '@angular/router';

export interface SidenavModel {
  mode: NavigationMode;
  labelText: string;
  href?: string;
  id?: any;
  selected?: boolean;
  children?: SidenavModel[];
  /**
   * Can any child links be seen
   */
  collapsed?: boolean;

  /** Any additional data users may want to attach to the sidenav model */
  optionalData?: any;

  /**
   * Query string paramaters supporeted with external and internal links
   * ex. { 'name': 'value',...}
   */
  queryParams?: {
    [k: string]: any;
  };

  queryParamsHandling?: QueryParamsHandling;
}

/**
 * Refers to navigation type for each side nav link.
 */
export enum NavigationMode {
  /** 
   * Navigation within a known route of the application. Navigation will be done through
   * Angular's routerLink directive
   */
  INTERNAL, 

  /**
   * Navigation to external url outside of the application. Navigation will be done through href attribute
   */
  EXTERNAL, 

  /**
   * No Navigation should occur. Only an event will be emitted when use clicks on a navigation item with this mode
   */
  LABEL
}
