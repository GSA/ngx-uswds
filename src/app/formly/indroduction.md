# Quick Start

Follow these steps to get started with USWDS Formly.

1. Install Formly packages:

```bash
 npm install @ngx-formly/core
 npm install @gsa-sam/uswds-formly

```

Once installed, `FormlyModule` and `UsaFormlyModule` will be imported in the Module:

```ts
import { FormlyModule } from '@ngx-formly/core';
import { UsaFormlyModule } from '@gsa-sam/uswds-formly';

@NgModule({
  imports: [
    FormlyModule.forRoot(),
    UsaFormlyModule
  ],
  ...
})
export class AppModule { }
```

For more details check [Properties and Options](https://formly.dev/guide/properties-options).

2. add `<formly-form>` inside the `form` tag to your `AppComponent` template:

```html
<form [formGroup]="form"">
  <formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>
</form>
```

3. Configure our defined form:
