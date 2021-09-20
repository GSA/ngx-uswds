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
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { MarkdownModule } from 'ngx-markdown';
import { ThemeSwitcherModule } from './shared/theme-switcher/theme-switcher.module';
import { UsaAppHeaderModule } from './shared/app-header/app-header.module';

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
    MarkdownModule.forRoot(),
    UsaAppHeaderModule,
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('highlightjs-line-numbers.js'), // Optional, only if you want the line numbers
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml')
        }
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
