import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaCalendar, UsaCalendarHeader } from "./calendar/calendar";
import { UsaCalendarBody } from "./calendar/calendar-body";
import { UsaMonthView } from "./calendar/month-view";
import { UsaMultiYearView } from "./calendar/multi-year-view";
import { UsaYearView } from "./calendar/year-view";
import { UsaNativeDateModule } from "./date-adapter";
import { UsaDatePicker, UsaDatePickerWrapper } from "./date-picker";
import { UsaDatePickerContent } from "./date-picker-base";
import { UsaDatePickerInput } from "./date-picker-input";
import { UsaDatePickerButton } from "./date-picker-button";


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
    UsaNativeDateModule,
  ],
  exports: [
    UsaDatePickerInput,
    UsaDatePickerButton,
    UsaNativeDateModule,
    UsaCalendar,
    UsaCalendarHeader,
    UsaCalendarBody,
    UsaDatePickerContent,
    UsaDatePicker,
    UsaDatePickerWrapper,
  ]
})
export class UsaDatePickerModule {}