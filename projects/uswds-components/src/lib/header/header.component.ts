import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  UsaHeaderPrimaryLinkTemplate,
  UsaHeaderSecondaryLinkTemplate,
} from './header-selectors';
import { UsaHeaderPrimaryLink } from './header.model';
import { UsaNavigationLink, UsaNavigationMode } from '../util/navigation';
@Component({
  selector: 'usa-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsaHeaderComponent implements OnInit {
  @ContentChild(UsaHeaderPrimaryLinkTemplate)
  primaryLinkTemplate: TemplateRef<any>;
  @ContentChild(UsaHeaderSecondaryLinkTemplate)
  secondaryLinkTemplate: TemplateRef<any>;

  @ViewChild('usaNavOpen') openNavBtn: ElementRef;
  @ViewChild('usaNavClose') closeNavBtn: ElementRef;

  mobileNavActive = false;

  /**
   * Title to display in header. Can be a string or a template reference
   */
  @Input() title: string | TemplateRef<any>;

  /**
   * Template to use for displaying menu button on mobile mode. By default,
   * the text 'Menu' will be used
   */
  @Input() menuButtonTemplate: TemplateRef<any>;

  /**
   * Aria label to use for over all navigation content
   * @default 'Primary Navigation'
   */
  @Input() navAriaLabel = 'Primary Navigation';

  /**
   * Whether the header should have secondary links or not.
   * @default false
   */
  @Input() extended = false;

  /**
   * Primary navigation items to display for header
   */
  @Input() primaryNavItems: UsaHeaderPrimaryLink[];

  /**
   * Secondary navigation items to display for header. Please note
   * that `extended` input must also be passed in as `true` for the
   * secondary nav items to display
   */
  @Input() secondaryNavItems: UsaNavigationLink[];

  /**
   * Defines whether or not to display dark overlay in background
   * whenever submenu or megamenu is active
   */
  @Input() displayOverlayOnMenuOpen = false;

  /**
   * event emitted whenever a navigation item is clicked.
   * This only fires if navigation mode for the link event is NONE or undefined
   */
  @Output()
  linkEvent = new EventEmitter<UsaNavigationLink>();

  NavigationMode = UsaNavigationMode;

  /** Reference of link whose dropdown menu is currently open */
  selectedDropdownLink: UsaHeaderPrimaryLink;

  /** Reference to currently selected navigation link */
  selectedNavItem: UsaNavigationLink;

  // When the mobile nav is active, and the close box isn't visible,
  // we know the user's viewport has been resized to be larger.
  // Let's make the page state consistent by deactivating the mobile nav.
  @HostListener('window:resize', ['$event'])
  onBrowserResize(event) {
    if (
      this.mobileNavActive &&
      this.closeNavBtn.nativeElement.getBoundingClientRect().width === 0
    ) {
      this.mobileNavActive = false;
    }
  }

  @HostListener('document:click', ['$event'])
  documentClick($event: any) {
    this.selectedDropdownLink = null;
  }

  constructor(public changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    /** Look through primary and secondary nav and select the first selected nav item.
     * Toggle the rest off if they are selected */
    this.selectInitialNavItem(this.primaryNavItems);
    this.selectInitialNavItem(this.secondaryNavItems);
  }

  getTypeOfTitle(): 'string' | 'object' {
    return typeof this.title === 'string' ? 'string' : 'object';
  }

  /**
   * Takes in a text string and removes all white space characters and returns the new string
   * @param text
   */
  removeWhiteSpace(text: string) {
    return text.replace(/ /g, '');
  }

  /**
   * Link clicked and emits the link data into an event
   * @param link
   */
  linkClickEvent(link: UsaNavigationLink, parentNav?: UsaNavigationLink) {
    const itemToSelect = parentNav ? parentNav : link;
    this.selectNavItem(itemToSelect);
    this.linkEvent.emit(link);
  }

  /**
   * Public Interface - select a navigation item to mark as selected.
   * @param item - The item to select. This item will be marked as selected, and
   * any previously selected item will be un-selected. Note that only one nav item may
   * be selected at a time
   */
  selectNavItem(item: UsaNavigationLink) {
    if (this.selectedNavItem) {
      this.selectedNavItem.selected = false;
    }

    this.selectedNavItem = item;
    this.selectedNavItem.selected = true;
    this.changeDetector.detectChanges();
  }

  dropdownLinkClicked(link: UsaHeaderPrimaryLink, $event: Event) {
    // Opened dropdown link was clicked, close it
    if (link === this.selectedDropdownLink) {
      this.selectedDropdownLink = null;
      return;
    }

    // Otherwise, set the newly clicked link as the new open dropdown
    this.selectedDropdownLink = link;
    $event?.stopImmediatePropagation();
  }

  openMobileNav() {
    this.mobileNavActive = true;
  }

  closeMobileNav() {
    this.mobileNavActive = false;
    this.openNavBtn.nativeElement.focus();
  }

  navAnimationEnd() {
    this.closeNavBtn.nativeElement.focus();
  }

  /** Used during component init - selects the initial nav item by looking through input nav items */
  private selectInitialNavItem(navItemsList: UsaNavigationLink[]) {
    if (!navItemsList) return;

    navItemsList.forEach((item) => {
      if (this.selectedNavItem) {
        item.selected = false;
      } else if (item.selected) {
        this.selectedNavItem = item;
      }
    });
  }
}
