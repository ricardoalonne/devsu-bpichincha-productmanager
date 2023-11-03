import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateFormatService {
  constructor(private datePipe: DatePipe) {}

  transform(
    date: Date,
    format: string = 'yyyy-MM-dd',
    timezone: string = 'utc'
  ): string | null {
    return this.datePipe.transform(date, format, timezone);
  }

  convertOnlyDate(date: Date): string {
    return (
      this.datePipe.transform(date, 'yyyy-MM-ddT00:00:00.000') ??
      date.toDateString()
    );
  }

  addYears(date: Date, years: number = 1): Date {
    const newDate = new Date(this.convertOnlyDate(date));
    newDate.setFullYear(newDate.getFullYear() + years);
    return newDate;
  }

  addMonths(date: Date, months: number = 1): Date {
    const newDate = new Date(this.convertOnlyDate(date));
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  }

  addDays(date: Date, days: number = 1): Date {
    const newDate = new Date(this.convertOnlyDate(date));
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }
}
