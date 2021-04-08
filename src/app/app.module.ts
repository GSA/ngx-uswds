import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { 
  USWDSSidenavModule,
 } 
  from 'uswds-components';
import { AppRoutingModule } from './app.routing.module';
import { USWDSCardModule } from 'uswds-components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    USWDSSidenavModule,
    USWDSCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
