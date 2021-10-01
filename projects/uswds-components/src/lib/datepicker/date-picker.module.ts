import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaCalendar, UsaCalendarHeader } from "./calendar/calendar";
import { UsaCalendarBody } from "./calendar/calendar-body";
import { UsaMonthView } from "./calendar/month-view";
import { UsaMultiYearView } from "./calendar/multi-year-view";
import { UsaYearView } from "./calendar/year-view";
import { UsaDatePicker, UsaDatePickerWrapper } from "./date-picker";
import { UsaDatePickerContent } from "./date-picker-base";
import { UsaDatePickerInput } from "./date-picker-input";
import { UsaDatePickerButton } from "./date-picker-button";
import { DateAdapter } from "./dateadapter/date-adapter";
import { NativeDateAdapter } from "./dateadapter/native-date-adapter";
import { USA_DATE_FORMATS } from "./dateadapter/date-formats";
import { USA_NATIVE_DATE_FORMATS } from "./dateadapter/native-date-formats";
import { HoverClassModule } from "../util/hover-class";


@NgModule({
  declarations: [
    UsaDatePickerInput,
    UsaDatePickerButton,
    UsaCalendar,
    UsaCalendarHeader,
    UsaCalendarBody,
    UsaMonthView,
    UsaYearView,
    UsaMultiYearView,
    UsaCalendarBody,
    UsaDatePickerContent,
    UsaDatePicker,
    UsaDatePickerWrapper,
  ],
  imports: [
    CommonModule,
    HoverClassModule,
  ],
  providers: [
    {provide: DateAdapter, useClass: NativeDateAdapter},
    {provide: USA_DATE_FORMATS, useValue: USA_NATIVE_DATE_FORMATS}
  ],
  exports: [
    UsaDatePickerInput,
    UsaDatePickerButton,
    UsaCalendar,
    UsaCalendarHeader,
    UsaCalendarBody,
    UsaDatePickerContent,
    UsaDatePicker,
    UsaDatePickerWrapper,
  ]
})
export class UsaDatePickerModule {}