import { Directive, TemplateRef } from "@angular/core";


@Directive({
  selector: `[usa-combo-box-item-template]`
})
export class UsaComboBoxItemTemplate {
  constructor(public templateRef: TemplateRef<any>) {}
}