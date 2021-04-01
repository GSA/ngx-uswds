export interface SidenavModel {
  labelText: string;
  href: string;
  id?: any;
  selected?: boolean;
  children?: SidenavModel[];

  /** Any additional data users may want to attach to the sidenav model */
  optionalData?: any;
}