export interface DateProvider {
  differenceInYears(dateLeft: Date, dateRight: Date): number
  addMinutes(date: Date, minutes: number): Date
  subMinutes(date: Date, minutes: number): Date
  subYears(date: Date, years: number): Date
  isPast(date: Date): boolean
}
