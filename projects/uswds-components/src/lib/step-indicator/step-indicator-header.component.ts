import { Component, Host, Input, TemplateRef } from '@angular/core';
import { UsaStepIndicatorComponent } from './step-indicator.component';

@Component({
  standalone: false,
  selector: `[UsaStepHeader]`,
  template: `
    @if (template) {
      <ng-template [ngTemplateOutlet]="template"></ng-template>
    } @else {
      <span class="usa-step-indicator__heading-counter">
        <span class="usa-step-indicator__current-step">{{ stepIndicator?.currentStep + 1 }}</span>
        <span class="usa-step-indicator__total-steps"> of {{ stepIndicator?.steps.length }}</span>
      </span>
      <span class="usa-step-indicator__heading-text">{{ stepIndicator?.steps[stepIndicator?.currentStep].label }}</span>
    }
  `,
  host: {
    class: 'usa-step-indicator__heading',
    '[class.margin-top-0]': "stepIndicator.headerPosition === 'top'",
    '[class.margin-bottom-4]': "stepIndicator.headerPosition === 'top'",
  },
})
export class UsaStepIndicatorHeaderComponent {
  @Input() template: TemplateRef<any>;

  constructor(@Host() public stepIndicator: UsaStepIndicatorComponent) {}
}
