export interface UsaNavigationLink {
    /**
     * Text to be displayed in the link or button
     */
    text: string;

    /**
     * Identifier to use for the item
     */
    id: string;

    /**
     * Status of of the item is selected
     * Selected items have visual indicators that separate
     * then from non-selected links
     */
    selected?: boolean;

    /** 
     * Defines route to navigate to on click. The route will be attached to an href attribute
     * of an anchor tag. If you'd like to control navigation application side, please leave this value
     * undefined
     */
    href?: string

    /**
     * Any additional data users might want to attach to this navigation item.
     */
    [key: string]: any;
}

export interface UsaHeaderPrimaryLink extends UsaNavigationLink {

    /**
     * List of child navigation items that will show when no route is provieded
     */
    children?: UsaNavigationLink[];

    /**
     * Relative only if link contains children and is a dropdown.
     * Defines whether to display children links in a megamenu style,
     * which expands width to take up full page width
     */
    isMegamenu?: boolean;
}

export enum NavigationMode {
    /** Use internal angular routing */
    INTERNAL = 0,

    /** Use href tag for navigation */
    EXTERNAL = 1,

    /** Do not perform routing */
    NONE = 2
}
