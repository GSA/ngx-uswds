import { NgModule } from "@angular/core";
import { DateAdapter } from "./date-adapter";
import { USA_DATE_FORMATS } from "./date-formats";
import { NativeDateAdapter } from "./native-date-adapter";
import { USA_NATIVE_DATE_FORMATS } from "./native-date-formats";


@NgModule({
  providers: [
    {provide: DateAdapter, useClass: NativeDateAdapter},
  ],
})
export class NativeDateModule {}

@NgModule({
  imports: [NativeDateModule],
  providers: [{provide: USA_DATE_FORMATS, useValue: USA_NATIVE_DATE_FORMATS}],
})
export class UsaNativeDateModule {}