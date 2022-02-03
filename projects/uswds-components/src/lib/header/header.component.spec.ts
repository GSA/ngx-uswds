import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UsaNavigationLink } from '../util/navigation';
import { UsaHeaderPrimaryLink } from './header.model';
import { UsaHeaderModule } from './header.module';

fdescribe('HeaderComponent', () => {
  let component: MockHeaderComponent;
  let fixture: ComponentFixture<MockHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockHeaderComponent],
      imports: [UsaHeaderModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have four primary nav items', () => {
    const allNavLinks = fixture.debugElement.queryAll(By.css('.usa-nav__link'));
    expect(allNavLinks.length).toEqual(4);
  });

  it('Should have one primary nav with href defined', () => {
    const allNavLinks = fixture.debugElement.queryAll(By.css('.usa-nav__link'));
    const primaryNavWithHref = allNavLinks.filter(
      (node) =>
        node.attributes['href'] && node.attributes['href'].includes('item')
    );
    expect(primaryNavWithHref.length).toEqual(0);
  });

  it('Should have two primary links that are menu buttons', () => {
    const dropdownLinks = fixture.debugElement.queryAll(
      By.css('.usa-accordion__button')
    );
    expect(dropdownLinks.length).toEqual(2);
  });

  it('Should open submenu when header dropdown button is clicked', () => {
    let dropdownLink = fixture.debugElement.query(By.css('#item3'));
    dropdownLink.triggerEventHandler('click', null);

    fixture.detectChanges();

    dropdownLink = fixture.debugElement.query(By.css('#item3'));
    expect(dropdownLink.attributes['aria-expanded']).toEqual('true');

    const subMenuQuery = fixture.debugElement.queryAll(
      By.css('.usa-nav__submenu')
    );
    expect(subMenuQuery.length).toEqual(1);

    const megamenuQuery = fixture.debugElement.queryAll(
      By.css('.usa-megamenu')
    );
    expect(megamenuQuery.length).toEqual(0);
  });

  it('Should close opened submenu when another dropdown is clicked', () => {
    // Open a dropdown link
    let dropdownLink = fixture.debugElement.query(By.css('#item3'));
    dropdownLink.triggerEventHandler('click', null);

    fixture.detectChanges();

    // Click on another dropdown link
    dropdownLink = fixture.debugElement.query(By.css('#item4'));
    dropdownLink.triggerEventHandler('click', null);

    fixture.detectChanges();

    // Expect initial dropdown link to be closed
    const initialDropdownLink = fixture.debugElement.query(By.css('#item3'));
    expect(initialDropdownLink.attributes['aria-expanded']).toEqual('false');

    // Should only have one submenu, the newly clicked dropdown link
    const subMenuQuery = fixture.debugElement.queryAll(
      By.css('.usa-nav__submenu')
    );
    expect(subMenuQuery.length).toEqual(1);

    // Which should also be a megamenu
    const megamenuQuery = fixture.debugElement.queryAll(
      By.css('.usa-megamenu')
    );
    expect(megamenuQuery.length).toEqual(1);
  });

  it('Should not contain provided secondary items if extended input is false', () => {
    const secondaryNavItems = fixture.debugElement.queryAll(
      By.css('.usa-nav__secondary-item')
    );
    expect(secondaryNavItems.length).toEqual(0);
  });

  it('Should contain secondary items if extended input is true', () => {
    component.extended = true;
    fixture.detectChanges();
    const secondaryNavItems = fixture.debugElement.queryAll(
      By.css('.usa-nav__secondary-item')
    );
    expect(secondaryNavItems.length).toEqual(2);
  });
});

@Component({
  template: `
    <usa-header
      [extended]="extended"
      [primaryNavItems]="primaryNav"
      [secondaryNavItems]="secondaryNav"
    ></usa-header>
  `,
})
class MockHeaderComponent {
  public extended = false;

  constructor(public elementRef: ElementRef) {}

  primaryNav: UsaHeaderPrimaryLink[] = [
    {
      text: 'Item 1',
      id: 'item1',
      href: '/item1',
    },
    {
      text: 'Item 2',
      id: 'item2',
    },
    {
      text: 'Item 3',
      id: 'item3',
      children: [
        {
          text: 'item3Child1',
          id: 'item3Child1',
        },
        {
          text: 'item3Child2',
          id: 'item3Child2',
        },
      ],
    },
    {
      text: 'Item 4',
      id: 'item4',
      isMegamenu: true,
      children: [
        {
          text: 'item4Child1',
          id: 'item4Child1',
        },
        {
          text: 'item4Child2',
          id: 'item4Child2',
        },
      ],
    },
  ];

  secondaryNav: UsaNavigationLink[] = [
    {
      text: 'Secondary Item 1',
      id: 'secondaryItem1',
    },
    {
      text: 'Secondary Item 2',
      id: 'secondaryItem2',
    },
  ];
}
