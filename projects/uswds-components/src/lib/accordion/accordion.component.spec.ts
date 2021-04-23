import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UsaAccordionChangeEvent } from "./accordion-items";
import { UsaAccordionComponent } from "./accordion.component";
import { UsaAccordionConfig } from "./accordion.config";
import { UsaAccordionModule } from "./accordion.module";

export function createGenericTestComponent<T>(
  html: string, type: {new (...args: any[]): T}, detectChanges = true): ComponentFixture<T> {
TestBed.overrideComponent(type, {set: {template: html}});
const fixture = TestBed.createComponent(type);
if (detectChanges) {
  fixture.detectChanges();
}
return fixture as ComponentFixture<T>;
}

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

function getPanels(element: HTMLElement): HTMLDivElement[] {
  return <HTMLDivElement[]>Array.from(element.querySelectorAll('.usa-accordion__heading'));
}

function getPanelsButton(element: HTMLElement): HTMLButtonElement[] {
  return <HTMLButtonElement[]>Array.from(element.querySelectorAll('.usa-accordion__button'));
}

function getPanelsContent(element: HTMLElement): HTMLDivElement[] {
  return <HTMLDivElement[]>Array.from(element.querySelectorAll('.usa-accordion__content'));
}

function getPanelsTitle(element: HTMLElement): string[] {
  return getPanelsButton(element).map(button => button.textContent !.trim());
}

function expectOpenPanels(nativeEl: HTMLElement, openPanelsDef: boolean[]) {
  const noOfOpenPanels = openPanelsDef.reduce((soFar, def) => def ? soFar + 1 : soFar, 0);
  const panels = getPanels(nativeEl);
  expect(panels.length).toBe(openPanelsDef.length);

  const panelsButton = getPanelsButton(nativeEl);
  const result = panelsButton.map(titleEl => {
    const isAriaExpanded = titleEl.getAttribute('aria-expanded') === 'true';
    const isCSSCollapsed = titleEl.classList.contains('collapsed');
    return isAriaExpanded === !isCSSCollapsed ? isAriaExpanded : fail('inconsistent state');
  });

  const panelContents = getPanelsContent(nativeEl);
  panelContents.forEach(panelContent => { expect(panelContent.classList.contains('show')).toBeTruthy(); });

  expect(panelContents.length).toBe(noOfOpenPanels);
  expect(result).toEqual(openPanelsDef);
}

describe('Accordion Component', () => {

  let html = `
    <usa-accordion #acc="usaAccordion" [singleSelect]="singleSelect" [activeIds]="activeIds"
      (panelChange)="changeCallback($event)" (shown)="shownCallback($event)" (hidden)="hiddenCallback($event)" [type]="classType">
      <usa-panel *ngFor="let panel of panels" [id]="panel.id" [disabled]="panel.disabled"
        (shown)="panelShownCallback($event)" (hidden)="panelHiddenCallback($event)">
        <ng-template UsaAccordionHeader>{{panel.header}}</ng-template>
        <ng-template UsaAccordionContent>{{panel.content}}</ng-template>
      </usa-panel>
    </usa-accordion>
    <button *ngFor="let panel of panels" (click)="acc.toggle(panel.id)">Toggle the panel {{ panel.id }}</button>
  `;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        declarations: [TestComponent], 
        imports: [UsaAccordionModule, BrowserAnimationsModule]
      }
    );
    TestBed.overrideComponent(TestComponent, {set: {template: html}});

  });

  it('should initialize inputs with default values', () => {
    const defaultConfig = new UsaAccordionConfig();
    const accordionCmp = TestBed.createComponent(UsaAccordionComponent).componentInstance;
    expect(accordionCmp.bordered).toBe(defaultConfig.bordered);
    expect(accordionCmp.singleSelect).toBe(defaultConfig.singleSelect);
    expect(accordionCmp.animation).toBe(defaultConfig.animation);
  });
})

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  activeIds: string | string[] = [];
  singleSelect = true;
  animation = false;
  panels = [
    {id: 'one', disabled: false, header: 'Panel 1', content: 'foo'},
    {id: 'two', disabled: false, header: 'Panel 2', content: 'bar'},
    {id: 'three', disabled: false, header: 'Panel 3', content: 'baz'}
  ];
  changeCallback = (event: UsaAccordionChangeEvent) => {};
  shownCallback = (panelId: string) => {};
  hiddenCallback = (panelId: string) => {};
  panelShownCallback = (panelId?: string) => {};
  panelHiddenCallback = (panelId?: string) => {};
  preventDefaultCallback = (event: UsaAccordionChangeEvent) => { event.preventDefault(); };
}