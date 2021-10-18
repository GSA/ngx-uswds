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

export enum NavigationMode {
  INTERNAL, EXTERNAL, LABEL
}
