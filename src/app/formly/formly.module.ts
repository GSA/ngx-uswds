import { NgModule } from '@angular/core';
import { FormlyRoutingModule } from './formly.routing.module';
import { FormlyMainComponent } from './formly-main.component';
import { UsaSidenavModule, USWDSCardModule } from '@gsa-sam/ngx-uswds';

@NgModule({
    declarations: [
        FormlyMainComponent
    ],
    imports: [
        FormlyRoutingModule,
        UsaSidenavModule,
        USWDSCardModule,
    ],
})
export class FormlyModule { }
