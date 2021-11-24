import { QueryParamsHandling } from "@angular/router";

export enum UsaNavigationMode {
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
   EVENT,
 
   /**
    * No Navigation and no event on user click. Link will be uninteractive
    */
   LABEL,
}

export interface UsaNavigationLink<T = any> {
  /**
   * Text to be displayed in the link or button
  */
   text: string;

   /**
    * Identifier to use for the item
    */
   id: string;


  /** 
   * Define navigation behavior for the link
   * 
   * NavigationMode.INTERNAL - Use angular routerlinks
   * 
   * NavigationMode.EXTERNAL - use anchor tag's href attribute
   * 
   * NavigationMode.EVENT - Do not route, simply fire an event on click
   * 
   * NavigationMode.LABEL - Non interactive label. Do not route, do not fire event
   */
   mode?: UsaNavigationMode;

   /**
    * Selected items have visual indicators that separate
    * then from non-selected links
    */
   selected?: boolean;

   /** 
    * Defines route to navigate to on click. The route will be attached to an href attribute
    * of an anchor tag. If you'd like to control navigation application side, please leave this value
    * undefined
    */
   path?: string;

   /** 
    * Defines additional query parameters to add for angular routing
    * Only relevent when routing is internal
    */
   queryParams?: {[key: string]: any};

  /** 
   * Defines query param strategy to use for angular routing
   * Only relevent when routing is internal
   */
   queryParamsHandling?: QueryParamsHandling;

   /** Additional sub routes for the navigation link */
   children?: T[] & UsaNavigationLink[];

   /** Any additional data to add into the model */
   [key: string]: any;
}