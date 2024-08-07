import { ElapsedTime } from "../ElapsedTime.js";
let warn = (...args) => {
    if (ElapsedTime.debug)
        console.warn("about-time | ", ...args);
};
let log = (...args) => {
    console.log("about-time | ", ...args);
};
var compatShim = true;
export function clockStatus() {
    //@ts-ignore
    return window.SimpleCalendar.api.clockStatus();
}
export function secondsToInterval(seconds) {
    //@ts-ignore
    const interval = window.SimpleCalendar.api.secondsToInterval(secondds);
    // compat shim
    return intervalSCtoAT(interval);
}
export function currentWorldTime() {
    //@ts-ignore
    return game.time.worldTime;
    // look at window.SimpleCalendar.api.timestamp()
}
export function timestamp() {
    //@ts-ignore
    return window.SimpleCalendar.api.timestamp();
}
export function dateToTimestamp(date) {
    date = intervalATtoSC(date);
    //@ts-ignore
    return window.SimpleCalendar.api.dateToTimestamp(date);
}
export function intervalATtoSC(interval) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const newInterval = {};
    // if (compatShim && ((interval.years || interval.months || interval.days || interval.hours || interval.minutes || interval.seconds) !== undefined)) {
    if (_d = (_c = (_b = (_a = interval.years, (_a !== null && _a !== void 0 ? _a : interval.months)), (_b !== null && _b !== void 0 ? _b : interval.days)), (_c !== null && _c !== void 0 ? _c : interval.hours)), (_d !== null && _d !== void 0 ? _d : interval.minutes)) {
        warn("About time | DT Mod notation has changed plese use .year/.month/.day/.hour/.minute/.sceond", interval);
        warn("About time | DT Mod deprecated - use SimpleCalendar.api instead");
    }
    newInterval.year = (_e = interval.year, (_e !== null && _e !== void 0 ? _e : interval.years));
    newInterval.month = (_f = interval.month, (_f !== null && _f !== void 0 ? _f : interval.months));
    newInterval.day = (_g = interval.day, (_g !== null && _g !== void 0 ? _g : interval.days));
    newInterval.hour = (_h = interval.hour, (_h !== null && _h !== void 0 ? _h : interval.hours));
    newInterval.minute = (_j = interval.minute, (_j !== null && _j !== void 0 ? _j : interval.minutes));
    newInterval.seconds = (_k = interval.seconds, (_k !== null && _k !== void 0 ? _k : interval.second));
    // }
    return newInterval;
}
export function intervalSCtoAT(interval) {
    var _a, _b, _c, _d, _e, _f;
    const newInterval = {};
    if (compatShim) {
        newInterval.years = (_a = interval.year, (_a !== null && _a !== void 0 ? _a : interval.years));
        newInterval.months = (_b = interval.month, (_b !== null && _b !== void 0 ? _b : interval.months));
        newInterval.days = (_c = interval.day, (_c !== null && _c !== void 0 ? _c : interval.days));
        newInterval.hours = (_d = interval.hour, (_d !== null && _d !== void 0 ? _d : interval.hours));
        newInterval.minutes = (_e = interval.minute, (_e !== null && _e !== void 0 ? _e : interval.minutes));
        newInterval.seconds = (_f = interval.second, (_f !== null && _f !== void 0 ? _f : interval.seconds));
    }
    return newInterval;
}
export function padNumber(n, digits = 2) {
    return `${n}`.padStart(digits, "0");
}
