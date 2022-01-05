import { UsaNavigationLink } from "../util/navigation";

export interface UsaHeaderPrimaryLink extends UsaNavigationLink {
    /**
     * Relative only if link contains children and is a dropdown.
     * Defines whether to display children links in a megamenu style,
     * which expands width to take up full page width
     */
    isMegamenu?: boolean;
}
