import { ElapsedTime } from "../ElapsedTime.js";
let warn = (...args) => {
    if (ElapsedTime.debug)
        console.warn("about-time | ", ...args);
};
let log = (...args) => {
    console.log("about-time | ", ...args);
};
export class DTCalc {
    /**
     *
     * @param year how many leap years from uear 0 to year "year"
     */
    static numLeapYears(year) {
        console.error("about-time | numLeapYears not supported no replacement");
        return -1;
    }
    static setFirstDay(day) {
        console.error("about-time | setFirstDay not supported - use Simple Calendar UI");
    }
    static padNumber(n, digits = 2) {
        return `${n}`.padStart(digits, "0");
    }
    static padYear(n, digits = 2) {
        return `${n}`.padStart(digits, " ");
    }
    /**
     *
     * @param year is year "year" a leap year 1 for yes, 0 for no.
     */
    static isLeapYear(year) {
        console.error("about-time | isLeapYear not supported");
        return undefined;
    }
    /**
     *
     * @param year how days in the year "year" - know about leap years
     */
    static daysInYear(year) {
        warn("about-time | deprecated - no replacement");
    }
    static get spd() {
        //@ts-ignore
        return window.SimpleCalendar.api.timestampPlusInterval(0, { day: 1 });
    }
    /**
    *
    * @param {days, hours, minutes, second} return the equivalent total number of seconds.
    */
    static timeToSeconds({ days = 0, hours = 0, minutes = 0, seconds = 0 }) {
        console.error(`about-time | deprecated use 
      const today = game.time.worldTime;
      const interval = {day: days, hour: hours, mintue: minutes, seconds: seconds};
      const future = simpleCalendar.api.timestampPlusInterval(today, interval)
      timeToSeconds = future - today;
    `);
        //@ts-ignore
        const today = window.SimpleCalendar.api.timestampToDate(window.SimpleCalendar.api.timestamp);
        const interval = { day: days, hour: hours, mintue: minutes, seconds };
        //@ts-ignore
        const future = window.SimpleCalendar.api.timestampPlusInterval(window.SimpleCalendar.api.timesteamp, interval);
        return future - today;
    }
}
DTCalc.sum = (...args) => args.reduce((acc, v) => acc + v);
