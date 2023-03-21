/**
 * 
 * @param d1 first date
 * @param d2 last date
 * @returns the absolute duration between the dates in years and weeks (will never be negative)
 */
export function getYearWeekDurationBetween(d1: Date, d2: Date): YearWeekDuration {
    // we will use the absolute difference between the two dates 
    let delta = Math.abs(d2.getTime() - d1.getTime());
    // years is calculated as whole years 
    const years = Math.floor(delta / msInYear);
    // subtract the whole years from the msDelta
    delta -= years * msInYear;
    // the rest gives number of weeks and we want it modulo ~ 52 
    const weeks = Math.floor(delta / msInWeek) % NominalWeeksInYear;
    // sometime the result will be 52 weeks - then add one to year and set weeks to zero 
    if (52 == weeks) {
        return {
            years: years + 1,
            weeks: 0
        }
    } else {
        return {
            years,
            weeks
        }
    }
}

// openEHR constants for time related variables 
const NominalDaysInYear = 365.242199;
//const NominalDaysInMonth = NominalDaysInYear / 12.0;
const SecondsInMinute = 60;
const MinutesInHour = 60;
const HoursInDay = 24;
//const MaxDaysInMonth = 31;
//const DaysInYear = 365;
//const DaysInLeapYear = 366;
//const MaxDaysInYear = DaysInLeapYear;
const DaysInWeek = 7;
//const MonthsInYear = 12;
const MilliSecondsInSeconds = 1000;
//const MilliSecondsInDay = MilliSecondsInSeconds * SecondsInMinute * MinutesInHour * HoursInDay;
const NominalWeeksInYear = 52.177457;

const msInYear = NominalDaysInYear * HoursInDay * MinutesInHour * SecondsInMinute * MilliSecondsInSeconds;
const msInWeek = DaysInWeek * HoursInDay * MinutesInHour * SecondsInMinute * MilliSecondsInSeconds;

/**
 * A type to carry duration data 
 */
export type YearWeekDuration = {
    years?: number;
    weeks?: number;
}
