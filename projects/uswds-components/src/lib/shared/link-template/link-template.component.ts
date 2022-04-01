import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UsaNavigationLink, UsaNavigationMode } from "../../util/navigation";


@Component({
  selector: `usa-link-template`,
  templateUrl: './link-template.component.html'
})
export class UsaLinkTemplateComponent {

  NavigationMode = UsaNavigationMode;

  @Input() link: UsaNavigationLink;

  /**
   * Class to apply to anchor tag element when
   * displaying link.
   * @default - empty string
   */
  @Input() class: string = '';

  /** 
   * Class to apply for selected item. 
   * Use empty string to not apply any class for selected item
   * @default 'usa-current'
   * */
  @Input() currentClass: string = 'usa-current';


  @Output() linkClicked = new EventEmitter<UsaNavigationLink>();

  /**
   * creates url from provided route and query params
   * @param item - Link to use when building url
   */
  urlBuilder(item: UsaNavigationLink): string {
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

  private queryStringBuilder(item: UsaNavigationLink): string {
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
}