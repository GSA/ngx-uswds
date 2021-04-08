import { Component, Host, Input, TemplateRef } from "@angular/core";
import { UsaStepIndicatorComponent } from "./step-indicator.component";

@Component({
  selector: `[UsaStepHeader]`,
  template: `
    <ng-container *ngIf="template else default">
      <ng-template [ngTemplateOutlet]="template"></ng-template>
    </ng-container>

    <ng-template #default>
      <span class="usa-step-indicator__heading-counter">
        <span class="usa-sr-only">Step</span>
        <span class="usa-step-indicator__current-step">{{stepIndicator?.currentStep + 1}}</span>
        <span class="usa-step-indicator__total-steps"> of {{stepIndicator?.steps.length}}</span>
      </span>
      <span class="usa-step-indicator__heading-text">{{stepIndicator?.steps[stepIndicator?.currentStep].label}}</span>
    </ng-template>
  `,
  host: {
    'class': 'usa-step-indicator__heading',
    '[class.margin-top-0]': 'stepIndicator.headerPosition === \'top\'',
    '[class.margin-bottom-4]': 'stepIndicator.headerPosition === \'top\''
  }
})
export class UsaStepIndicatorHeaderComponent {

  @Input() template: TemplateRef<any>;

  constructor(
    @Host() public stepIndicator: UsaStepIndicatorComponent
  ) {}
}
