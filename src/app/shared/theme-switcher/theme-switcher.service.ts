import { Injectable } from "@angular/core";

@Injectable()
export class ThemeSwitcherService {
  /**
  * Set the stylesheet with the specified key.
  */
  setStyle(key: string, href: string) {
    this.getLinkElementForKey(key).setAttribute("href", href);
  }

  /**
  * Remove the stylesheet with the specified key.
  */
  removeStyle(key: string) {
    const existingLinkElement = this.getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement);
    }
  }

  removeStyleWithHref(href: string) {
    const existingLinkElement = document.head.querySelector(`link[rel="stylesheet"][href="${href}]`);
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement);
    }
  }

  private getLinkElementForKey(key: string) {
    return this.getExistingLinkElementByKey(key) || this.createLinkElementWithKey(key);
  }

  private getExistingLinkElementByKey(key: string) {
    return document.head.querySelector(
      `link[rel="stylesheet"].${this.getClassNameForKey(key)}`
    );
  }

  private createLinkElementWithKey(key: string) {
    const linkEl = document.createElement("link");
    linkEl.setAttribute("rel", "stylesheet");
    linkEl.classList.add(this.getClassNameForKey(key));
    document.head.appendChild(linkEl);
    return linkEl;
  }

  private getClassNameForKey(key: string) {
    return `app-${key}`;
  }
}
