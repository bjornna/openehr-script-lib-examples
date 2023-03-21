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
            const r = getYearWeekDurationBetween(parseDate(testCase.date1), parseDate(testCase.date2));
            expect(r.weeks, "Weeks ").equal(testCase.weeks);
            expect(r.years, "Years ").equal(testCase.years);
        })
    })


})
describe("Test days <= 7 days", () => {
    let n = 7;
    while (n > 0) {
        const base = "2023.03.01";
        const d2 = `2023.03.0${n}`;
        const d3 = `202${n}.03.01`;
        it("Days = " + d2, () => {
            const diff = getYearWeekDurationBetween(parseDate(base), parseDate(d2));
            expect(diff.weeks).equal(0);
            expect(diff.years).equal(0);
        })
        it(`Years ${d3}`,()=>{
            const diff = getYearWeekDurationBetween(parseDate(base), parseDate(d3));
            expect(diff.weeks).equal(0);
        })
        n--;
    }
})
describe("Test years on same date", ()=>{
    let year = 1980;
    while(year <= 2023){
        const d2 = "2023.02.01";
        const d1 = `${year}.02.01`;
        it(`${d2} should be weeks = 0`, ()=>{
            const diff = getYearWeekDurationBetween(parseDate(d1), parseDate(d2));
            expect(diff.weeks).eq(0);
        })
        year++;

    }
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

