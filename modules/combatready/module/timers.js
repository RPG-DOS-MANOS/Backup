import { MODULE_NAME } from "./settings.js";
import { availableTimers, currentTimer } from "./api.js";
import { CombatReady } from "./combatReady.js";
import { CombatReadySubSettings, enumerateSettings, SettingsAwareEntity } from "./settingsAwareEntity.js";
export class CombatReadyTimer extends SettingsAwareEntity {
    constructor(id) {
        super(id);
        this.type = "timers";
    }
    initialize() {
        throw new Error("A CombatReadyTimer must implement the initialize function");
    }
    destroy() {
        throw new Error("A CombatReadyTimer must implement the destroy function");
    }
    start() {
        throw new Error("A CombatReadyTimer must implement the start function");
    }
    stop() {
        throw new Error("A CombatReadyTimer must implement the stop function");
    }
    pause() {
        throw new Error("A CombatReadyTimer must implement the pause function");
    }
    resume() {
        throw new Error("A CombatReadyTimer must implement the resume function");
    }
    tick() {
        return;
    }
    adjustWidth() {
        return;
    }
    get settings() {
        return [];
    }
}
export class NativeTimer extends CombatReadyTimer {
    constructor() {
        super(...arguments);
        this.name = "CombatReady";
    }
    initialize() {
        let body = document.getElementsByTagName("body")[0];
        let sidebar = document.getElementById("sidebar");
        let timebar = document.createElement("div");
        let timefill = document.createElement("div");
        timebar.id = "combatready-timebar";
        $(timebar).addClass("combatready-timebar");
        $(timefill).addClass("combatready-timebar-fill");
        timebar.appendChild(timefill);
        body.appendChild(timebar);
        // Ajust due to DOM elements
        timebar.style.width = `0px`;
        this.TIMEBAR = timebar;
        this.TIMEFILL = timefill;
        this.adjustWidth();
        this.TIMEFILL.style.backgroundColor = this.getSetting("timercolor");
        $(this.TIMEBAR).addClass("combatready-timebar-" + this.getSetting("timebarlocation"));
        this.tick(); //Do a tick to redraw in case is a reload;
        this.ready = true;
    }
    destroy() {
        this.TIMEBAR?.remove();
        this.TIMEFILL?.remove();
        this.ready = false;
    }
    start() {
        if (!this.ready)
            return;
        this.TIMEBAR.style.display = "block";
        this.TIMEFILL.style.width = "0%";
        this.TIMEFILL.style.transition = "none";
    }
    stop() {
        if (!this.ready)
            return;
        this.TIMEBAR.style.display = "none";
        this.TIMEFILL.style.width = "0%";
        this.TIMEFILL.style.transition = "none";
    }
    pause() {
        if (!this.ready)
            return;
        this.TIMEBAR.style.display = "block";
    }
    resume() {
        if (!this.ready)
            return;
        this.TIMEBAR.style.display = "block";
    }
    tick() {
        if (!this.ready)
            return;
        this.TIMEBAR.style.display = "block";
        //@ts-ignore
        let width = (game.modules.get(MODULE_NAME)?.api?.getCurrentTime() / game.modules.get(MODULE_NAME)?.api?.getMaxTime()) * 100;
        this.TIMEFILL.style.transition = "";
        this.TIMEFILL.style.width = `${width}%`;
    }
    adjustWidth() {
        let sidebar = document.getElementById("sidebar");
        let width = sidebar.offsetWidth;
        if (this.getSetting("timebarlocation") == "sidebar") {
            this.TIMEBAR.style.width = `100vh`;
        }
        else {
            if (this.getSetting("timebarlocation") == "bottom" && width == 30)
                width = 0;
            if ($(document.body).hasClass("mobile-improvements"))
                width = 0;
            this.TIMEBAR.style.width = `calc(100vw - ${width}px)`;
        }
    }
    get settings() {
        return [
            {
                id: "timercolor",
                setting: {
                    name: "combatReady.timers.native.settings.timerColor.name",
                    hint: "combatReady.timers.native.settings.timerColor.hint",
                    label: "Color Picker",
                    default: "#B71703ff",
                    scope: "world",
                    //@ts-ignore
                    onChange: (value) => { currentTimer.TIMEFILL.style.backgroundColor = value; },
                    type: "Color"
                }
            },
            {
                id: "timebarlocation",
                setting: {
                    name: "combatReady.timers.native.settings.timeBarLocation.name",
                    hint: "combatReady.timers.native.settings.timeBarLocation.hint",
                    scope: "world",
                    config: true,
                    default: "bottom",
                    choices: {
                        "top": "combatReady.timers.native.settings.timeBarLocation.text.top",
                        "sidebar": "combatReady.timers.native.settings.timeBarLocation.text.sidebar",
                        "bottom": "combatReady.timers.native.settings.timeBarLocation.text.bottom"
                    },
                    type: String,
                    onChange: (value) => {
                        //@ts-ignore
                        $(currentTimer.TIMEBAR).removeClass("combatready-timebar-top");
                        //@ts-ignore
                        $(currentTimer.TIMEBAR).removeClass("combatready-timebar-sidebar");
                        //@ts-ignore
                        $(currentTimer.TIMEBAR).removeClass("combatready-timebar-bottom");
                        //@ts-ignore
                        $(currentTimer.TIMEBAR).addClass("combatready-timebar-" + value);
                        CombatReady.adjustWidth();
                    }
                }
            }
        ];
    }
}
export class TimerSubSettings extends CombatReadySubSettings {
    constructor() {
        super(...arguments);
        this.type = "timers";
    }
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "combatready-timers-settings",
            title: game.i18n.localize("combatReady.settings.timers.settings.name"),
            template: "modules/combatready/templates/timers_settings.html"
        });
    }
    getData(options) {
        const data = {};
        data.isGM = game.user?.isGM;
        const selectedTimer = currentTimer.id;
        data.timers = Object.values(availableTimers).map(iTimer => {
            const timer = {};
            timer.id = iTimer.id;
            timer.hasSettings = iTimer instanceof CombatReadyTimer;
            if (timer.hasSettings)
                timer.settings = enumerateSettings(iTimer);
            timer.selectTitle = `${iTimer.id} | ${iTimer.name}`;
            if (iTimer.id == "native")
                timer.selectTitle = iTimer.name;
            timer.isSelected = timer.id === selectedTimer;
            return timer;
        });
        data.selectedTimerName = data.timers.find(timer => timer.isSelected).selectTitle;
        data.selectedTimer = {
            id: "selectedTimer",
            name: game.i18n.localize("combatReady.settings.timers.selectTimer.name"),
            hint: game.i18n.localize("combatReady.settings.timers.selectTimer.hint"),
            type: String,
            choices: data.timers.reduce((choices, timers) => {
                choices[timers.id] = timers.selectTitle;
                return choices;
            }, {}),
            value: selectedTimer,
            isCheckbox: false,
            isSelect: true,
            isRange: false,
        };
        return data;
    }
}
