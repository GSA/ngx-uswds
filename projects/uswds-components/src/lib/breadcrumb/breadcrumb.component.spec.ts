import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsaNavigationLink } from '../util/navigation';

import { UsaBreadcrumbComponent } from './breadcrumb.component';

describe('BreadcrumbComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsaBreadcrumbComponent, TestHostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });

  it('should create', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it('Should emit selected event when a breadcrumb option is selected', () => {
    const testItems = [
      {
        text: 'Secondary Item 1',
        id: 'secondaryItem1',
        selected: true,
      },
      {
        text: 'Secondary Item 2',
        id: 'secondaryItem2',
        selected: false,
      },
    ];
    testHostComponent.setInput(testItems);
    testHostFixture.detectChanges();
    const eventSpy = spyOn(
      testHostComponent.usaBreadcrumbComponent.selected,
      'emit'
    );
    const breadcrumb: UsaNavigationLink = {
      text: 'Secondary Item 1',
      id: 'secondaryItem1',
      selected: false,
    };
    testHostComponent.usaBreadcrumbComponent.updateSelectedBreadcrumb(
      breadcrumb
    );
    expect(
      testHostComponent.usaBreadcrumbComponent._selectedBreadcrumb.selected
    ).toBeTrue();
    expect(breadcrumb.selected).toBeTrue();
    expect(eventSpy).toHaveBeenCalledWith({
      text: 'Secondary Item 1',
      id: 'secondaryItem1',
      selected: true,
    });
  });

  @Component({
    selector: `host-component`,
    template: `<usa-breadcrumb
      [items]="testItems"
      [hideSingleCrumb]="hideSingleCrumb"
    ></usa-breadcrumb>`,
  })
  class TestHostComponent {
    @ViewChild(UsaBreadcrumbComponent)
    public usaBreadcrumbComponent: UsaBreadcrumbComponent;
    hideSingleCrumb = true;
    testItems: UsaNavigationLink[];

    setInput(newInput: UsaNavigationLink[]) {
      this.testItems = newInput;
    }
  }
});
