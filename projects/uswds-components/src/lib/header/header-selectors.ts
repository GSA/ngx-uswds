import { Directive, TemplateRef } from "@angular/core";

/**
 * Define primary navigation links for the header. Use this over passing in JSON model 
 * through primaryNavItems input if you'd like more customization to the header's primary
 * link templates. Only usable with ul tags.
 * @example
 * <usa-header>
 *  <ul usaHeaderPrimaryLinks>
 *     <li class="usa-nav__primary-item">
 *       <a href="<yourHref>">Navigation Link</a>
 *     </li>
 *   </ul>
 * </usa-header>
 * 
 */
@Directive({
  selector: `ul[usaHeaderPrimaryLinks]`,
  host: {
    class: 'usa-nav__primary usa-accordion',
  }
})
export class UsaHeaderPrimaryLinks {}

/**
 * Additional content to add to primary header that are not navigation links.
 * This content will be added after the primary header links
 * @example
 * <usa-header>
 *  <div usaHeaderPrimaryExtra>
 *    <usa-search></usa-search>
 *  </div>
 * </usa-header>
 */
@Directive({
  selector: `[usaHeaderPrimaryExtra]`,
})
export class UsaHeaderPrimaryExtra {}

/**
 * Define template for displaying primary navigation link. This is useful if you'd
 * like to pass in json model for primary links, and want some customization on
 * how the link text are displayed. Any primary links in the input model that do
 * not have `navigationMode` defined will use this template to display the link
 * @example
 * <usa-header [primaryNavItems]="yourJsonModel">
 *  <ng-template usaHeaderPrimaryLinkTemplate let-link>
 *    <your-custom-template-here [link]="link"></your-custom-template-here>
 *  </ng-template>
 * </usa-header>
 */
@Directive({
  selector: `[usaHeaderPrimaryLinkTemplate]`
})
export class UsaHeaderPrimaryLinkTemplate {
  constructor (public templateRef: TemplateRef<any>) {}
}

/**
 * Define secondary navigation links for the header. Use this over passing in JSON model 
 * through secondaryNavItems input if you'd like more customization to the header's secondary
 * link templates. Only usable with ul tags.
 * @example
 * <usa header [extended]="true">
 *  <ul usaHeaderSecondaryLinks>
 *    <li class="usa-nav__secondary-item">
        <a href="<yourHref>">Secondary Link</a>
      </li>
 *  </ul>
 * </usa-header>
 */
@Directive({
  selector: `ul[usaHeaderSecondaryLinks]`,
  host: {
    class: 'usa-nav__secondary-links',
  }
})
export class UsaHeaderSecondaryLinks {}

/**
 * Additional content to add to extended header aside from links. Content will be
 * added to the end of secondary links if secondary links are provided
 * @example
 * <usa-header [extended]="true">
 *  <div usaHeaderSecondaryExtra>
 *    <usa-search></usa-search>
 *  </div>
 * </usa-header>
 */
@Directive({
  selector: `[usaHeaderSecondaryExtra]`
})
export class UsaHeaderSecondaryExtra {}


/**
 * Define template for displaying secondary navigation link. This is useful if you'd
 * like to pass in json model for secondary links, and want some customization on
 * how the link text are displayed. Any secondary links in the input model that do
 * not have `navigationMode` defined will use this template to display the link
 * @example
 * <usa-header [secondaryNavItems]="yourJsonModel">
 *  <ng-template usaHeaderSecondaryLinkTemplate let-link>
 *    <your-custom-template-here [link]="link"></your-custom-template-here>
 *  </ng-template>
 * </usa-header>
 */
@Directive({
  selector: `[usaHeaderSecondaryLinkTemplate]`
})
export class UsaHeaderSecondaryLinkTemplate {
  constructor(public templateRef: TemplateRef<any>) {}
}


