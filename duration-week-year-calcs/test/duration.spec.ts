import { expect } from 'chai';
import { getYearWeekDurationBetween } from '../src/weekyear';

interface WeekYearTest {
    date1: string;
    date2: string;
    years: number;
    weeks: number
}


describe("Verify dates", () => {

    const suite: WeekYearTest[] = [
        {
            date1: "2023-03-18",
            date2: "2023-03-11",
            years: 0,
            weeks: 1
        }, {
            date1: "2021-03-10",
            date2: "2023-03-18",
            years: 2,
            weeks: 1
        }, {
            date1: "2023-03-04",
            date2: "2023-03-18",
            years: 0,
            weeks: 2
        }
        ,
        {
            date1: "2022-03-18",
            date2: "2023-03-18",
            years: 1,
            weeks: 0
        },
        {
            date1: "2000-03-18",
            date2: "2023-03-18",
            years: 23,
            weeks: 0
        }
        ,
        {
            date1: "2000-03-10",
            date2: "2023-03-18",
            years: 23,
            weeks: 1
        }
    ];
    suite.forEach(testCase => {
        it(toTestString(testCase), () => {            
            const r = getYearWeekDurationBetween(parseDate(testCase.date1),parseDate(testCase.date2));
            expect(r.weeks, "Weeks ").equal(testCase.weeks);
            expect(r.years, "Years ").equal(testCase.years);
        })
    })


})

describe("Test suite day by day", () => {
    const base = "2023-01-01";
    const d1 = parseDate(base);
    [{
        d: "2023-01-02",
        y: 0,
        w: 0
    }, {
        d: "2023-01-08",
        y: 0,
        w: 1
    }, {
        d: "2023-01-16",
        y: 0,
        w: 2
    }].forEach(s => {
        it(`${base} - ${s.d} is ${s.y} year and ${s.w} weeks`, () => {
            const d2 = parseDate(s.d);
            const r = getYearWeekDurationBetween(d1, d2);
            expect(r.years, "years").equal(s.y);
            expect(r.weeks, "weeks").equal(s.w);
        })
    })
})


function toTestString(w: WeekYearTest) {
    return `${w.date1} -> ${w.date2} should be y=${w.years}, w=${w.weeks}`;
}
/**
 * Function for the lazy coder to create a date
 * @param s ISO 8601 string representantion of a date
 * @returns 
 */
function parseDate(s: string): Date {
    return new Date(Date.parse(s));
}

