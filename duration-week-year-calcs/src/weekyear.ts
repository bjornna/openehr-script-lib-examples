

const NominalDaysInYear = 365.242199;
const NominalDaysInMonth = NominalDaysInYear / 12.0;
const SecondsInMinute = 60;
const MinutesInHour = 60;
const HoursInDay = 24;
const MaxDaysInMonth = 31;
const DaysInYear = 365;
const DaysInLeapYear = 366;
const MaxDaysInYear = DaysInLeapYear;
const DaysInWeek = 7;
const MonthsInYear = 12;
const MilliSecondsInSeconds = 1000;
const MilliSecondsInDay = MilliSecondsInSeconds * SecondsInMinute * MinutesInHour * HoursInDay;
const NominalWeeksInYear = 52.177457;

const msInYear = NominalDaysInYear * HoursInDay * MinutesInHour * SecondsInMinute * MilliSecondsInSeconds;
const msInWeek = DaysInWeek * HoursInDay * MinutesInHour * SecondsInMinute * MilliSecondsInSeconds;

export type YearWeekDuration = {
    years?: number;
    weeks?: number;
}
export function getYearWeekDurationBetween(d1: Date, d2: Date): YearWeekDuration {
    let delta = Math.abs(d2.getTime() - d1.getTime());

    const years = Math.floor(delta / msInYear);
    delta -= years * msInYear;

    const weeks = Math.floor(delta / msInWeek) % NominalWeeksInYear;


    if (52 == weeks) {
        return {
            years: years + 1,
            weeks: 0
        }
    } else {
        return {
            years, weeks
        }
    }


}

