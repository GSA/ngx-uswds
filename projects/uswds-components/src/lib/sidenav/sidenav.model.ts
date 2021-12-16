import { UsaNavigationLink } from '../util/navigation';

export interface SidenavModel extends UsaNavigationLink<SidenavModel> {

  /**
   * Can any child links be seen
   */
  collapsed?: boolean;
}
