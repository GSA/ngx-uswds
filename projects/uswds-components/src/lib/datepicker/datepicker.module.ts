import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UsaCalendar, UsaCalendarHeader } from "./calendar/calendar";
import { UsaCalendarBody } from "./calendar/calendar-body";
import { UsaMonthView } from "./calendar/month-view";
import { UsaMultiYearView } from "./calendar/multi-year-view";
import { UsaYearView } from "./calendar/year-view";
import { UsaNativeDateModule } from "./date-adapter";
import { UsaDatepicker, UsaDatepickerWrapper } from "./datepicker";
import { UsaDatepickerContent } from "./datepicker-base";
import { UsaDatepickerInput } from "./datepicker-input";
import { UsaDatepickerToggle } from "./datepicker-toggle";


@NgModule({
  declarations: [
    UsaDatepickerInput,
    UsaDatepickerToggle,
    UsaCalendar,
    UsaCalendarHeader,
    UsaCalendarBody,
    UsaMonthView,
    UsaYearView,
    UsaMultiYearView,
    UsaCalendarBody,
    UsaDatepickerContent,
    UsaDatepicker,
    UsaDatepickerWrapper,
  ],
  imports: [
    CommonModule,
    UsaNativeDateModule,
  ],
  exports: [
    UsaDatepickerInput,
    UsaDatepickerToggle,
    UsaNativeDateModule,
    UsaCalendar,
    UsaCalendarHeader,
    UsaCalendarBody,
    UsaDatepickerContent,
    UsaDatepicker,
    UsaDatepickerWrapper,
  ]
})
export class UsaDatepickerModule {}