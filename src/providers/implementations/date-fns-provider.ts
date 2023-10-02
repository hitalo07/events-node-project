import {
  differenceInYears,
  addMinutes,
  isPast,
  subMinutes,
  subYears,
} from 'date-fns'
import { DateProvider } from '../date-provider'

export class DateFNSProvider implements DateProvider {
  addMinutes(date: Date, minutes: number): Date {
    return addMinutes(date, minutes)
  }

  subMinutes(date: Date, minutes: number): Date {
    return subMinutes(date, minutes)
  }

  subYears(date: Date, years: number): Date {
    return subYears(date, years)
  }

  differenceInYears(dateLeft: Date, dateRight: Date): number {
    const diferrence = differenceInYears(dateLeft, dateRight)

    return diferrence
  }

  isPast(date: Date): boolean {
    return isPast(date)
  }
}
